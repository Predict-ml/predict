import Breadcrumb from '@/components/Breadcrumb'
import { SpinnerLoading } from '@/components/SpinnerLoading'
import { Button } from '@/components/ui/button/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { predictionService } from '@/services/predictStoraged/predictStoraged'
import { useAppSelector } from '@/store'
import { setLoading, setPredictions } from '@/store/slices/storedAnalisesSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

export function ListAllPredictsForOneAthlete() {
	const location = useLocation()
	const { userID } = useParams()
	const dispatch = useDispatch()
	const userPredictions = useAppSelector(
		(state) => state.storedAnalyses.predictions,
	)
	const loading = useAppSelector((state) => state.storedAnalyses.loading)

	useEffect(() => {
		const fetchPredictions = async () => {
			try {
				dispatch(setLoading(true))
				const athleteData = await predictionService.listPredictionsForAthlete(
					userID || '',
				)
				if ('message' in athleteData) {
					toast.error(athleteData.message)
					dispatch(setLoading(false))
					return
				}
				dispatch(setPredictions(athleteData))
			} catch (_error) {
				toast.error("Erreur lors du chargement des prévisions de l'athlète.")
				dispatch(setLoading(false))
			} finally {
				dispatch(setLoading(false))
			}
		}

		if (userID) {
			fetchPredictions()
		}
	}, [])

	if (loading) {
		return (
			<div className="grid place-items-center">
				<SpinnerLoading className="size-9" />
			</div>
		)
	}

	return (
		<div className="max-w-5xl w-full mx-auto p-4">
			<Breadcrumb basePath="/predictions-results" />
			<h1 className="text-2xl font-bold my-4">
				Prédictions pour {userPredictions?.name || 'Athlète'}
			</h1>

			<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
				{userPredictions?.Prediction.map((predict: any) => (
					<Card key={predict.id} className="shadow-lg">
						<CardHeader>
							<CardTitle>{predict.subCategory}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-700">
								ID de Prédiction: {predict.id}
							</p>
							<p className="text-sm text-gray-500">
								Date de création :{' '}
								{new Date(predict.createdAt).toLocaleDateString()}
							</p>
						</CardContent>
						<CardFooter>
							<Button
								className="text-sm text-blue-500 px-0"
								variant={'link'}
								asChild
							>
								<Link to={`${location.pathname}/${predict.id}`}>
									Voir les détails
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
