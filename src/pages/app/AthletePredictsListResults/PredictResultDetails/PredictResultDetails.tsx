import Breadcrumb from '@/components/Breadcrumb'
import { PredictResults } from '@/components/PredictResult'
import { ReportRunSection } from '@/components/ReportRunSection'
import { SpinnerLoading } from '@/components/SpinnerLoading'
import { predictionService } from '@/services/predictStoraged/predictStoraged'
import { useAppSelector } from '@/store'
import { setAppTitle } from '@/store/slices/appHeaderTitleSlice'
import {
	setCurrentAnalysis,
	setLoading,
	setWalkAnalysis,
} from '@/store/slices/storedAnalisesSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

export function PredictResultDetails() {
	const { userID, predictID } = useParams()
	const dispatch = useDispatch()
	const walkPrediction = useAppSelector(
		(state) => state.storedAnalyses.walkAnalysis,
	)
	const currentAnalysis = useAppSelector(
		(state) => state.storedAnalyses.currentAnalysis,
	)
	const loading = useAppSelector((state) => state.storedAnalyses.loading)

	const [an, setAn] = useState<any>({})

	setAppTitle({
		title: 'Détails de la Prédiction',
	})

	useEffect(() => {
		const fetchPredictions = async () => {
			try {
				dispatch(setLoading(true))
				const athleteData = await predictionService.getPredictionDetails(
					userID || '',
					predictID || '',
				)
				if ('message' in athleteData) {
					toast.error(athleteData.message)
					dispatch(setLoading(false))
					return
				}

				if (athleteData.walkAnalysis && athleteData.subCategory === 'walk') {
					dispatch(setWalkAnalysis(athleteData.walkAnalysis))
					dispatch(setCurrentAnalysis('walk'))
					return
				}

				if (athleteData.blockAnalysis && athleteData.subCategory === 'block') {
					const {
						predictData,
						armAnglesAnalysis,
						bodySymmetryAnalysis,
						jumpHeightAnalysis,
						reactionTimeAndSpeedAnalysis,
					} = athleteData.blockAnalysis

					dispatch(setCurrentAnalysis('block'))
					setAn({
						armAnglesAnalysis: JSON.parse(armAnglesAnalysis || '{}'),
						bodySymmetryAnalysis: JSON.parse(bodySymmetryAnalysis || '{}'),
						jumpHeightAnalysis: JSON.parse(jumpHeightAnalysis || '{}'),
						reactionTimeAndSpeedAnalysis: JSON.parse(
							reactionTimeAndSpeedAnalysis || '{}',
						),
						predict: predictData,
					})

					return
				}

				// TODO block analysis
			} catch (_error) {
				toast.error("Erreur lors du chargement des prévisions de l'athlète.")
				dispatch(setLoading(false))
			} finally {
				dispatch(setLoading(false))
			}
		}

		fetchPredictions()
	}, [userID])

	if (loading) {
		return (
			<div className="grid place-items-center">
				<SpinnerLoading className="size-9" />
			</div>
		)
	}

	return (
		<>
			<div className="p-4">
				<Breadcrumb basePath="/predictions-results" />
			</div>
			{currentAnalysis === 'walk' && (
				<ReportRunSection
					outputFileUrl={walkPrediction?.outputVideo || ''}
					predict={walkPrediction ? walkPrediction : {}}
				/>
			)}
			{currentAnalysis === 'block' && <PredictResults predictData={an} />}
		</>
	)
}
