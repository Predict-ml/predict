import { AthletePredictsListResultsTableRow } from '@/pages/app/AthletePredictsListResults/AthletePredictsListResultsTableRow'

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useAppTitle } from '@/hooks/useAppTitle'

import { predictionService } from '@/services/predictStoraged/predictStoraged'
import { useAppSelector } from '@/store'
import { setAthletes } from '@/store/slices/storedAnalisesSlice'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { FilterPredictsWithAthletName } from './FilterPredictsWithAthletName'

export const AthletePredictsListResults = () => {
	const [searchParams] = useSearchParams()

	const athleteName = searchParams.get('athleteName')

	useAppTitle({ title: 'Gestion des Athlètes' })
	const athletes = useAppSelector((state) => state.storedAnalyses.athletes)
	const dispatch = useDispatch()

	const { listAthletesWithPredictionCount } = predictionService

	useEffect(() => {
		const fetchAthletes = async () => {
			try {
				const athletesData = await listAthletesWithPredictionCount(
					athleteName || '',
				)

				if ('message' in athletesData) {
					console.error(
						'Erreur lors de la récupération des athlètes:',
						athletesData.message,
					)
					toast.error('Erreur lors de la récupération des athlètes')
					return
				}

				dispatch(setAthletes(athletesData))
			} catch (error) {
				console.error('Erreur lors de la récupération des athlètes:', error)
				toast.error('Erreur lors de la récupération des athlètes')
			}
		}

		fetchAthletes()
	}, [athleteName])

	return (
		<>
			<Helmet title="Athlète " />
			<div className="space-y-6 mx-auto w-full p-4 max-w-5xl">
				<FilterPredictsWithAthletName />

				<div className="">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-full min-w-[150px]">Nom</TableHead>
								<TableHead className="min-w-[160px]">
									quantité d'analyses.
								</TableHead>
								<TableHead className="min-w-[72px]"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{athletes.map((a) => (
								<AthletePredictsListResultsTableRow
									key={a.id}
									id={a.id}
									name={a.name}
									analysesCount={a._count.Prediction}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
