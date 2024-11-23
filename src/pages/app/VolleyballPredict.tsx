// components/VolleyballPredict.tsx
import { FormSubmitVideo, FormType } from '@/components/FormSubmitVideo'
import { PredictResults } from '@/components/PredictResult'
import { useAppTitle } from '@/hooks/useAppTitle'
import {
	PredictBlockReturn,
	volleyballPredictService,
} from '@/services/volleyballPredictService/volleyballPredictService'
import { useAppSelector } from '@/store'
import {
	setCrrPredictType,
	setLoading,
} from '@/store/slices/volleyballPredictSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const PREDICTOPTIONS = ['block']

export const VolleyballPredict = () => {
	useAppTitle({ title: 'Prédiction Volley-ball' })

	const dispatch = useDispatch()
	const loading = useAppSelector((state) => state.volleyballPredict.loading)
	const [blockAnalyses, setBlockAnalyses] = useState<PredictBlockReturn>(
		{} as PredictBlockReturn,
	)
	const predType = useAppSelector(
		(state) => state.volleyballPredict.crrPredictType,
	)

	const onSubmit = async (data: FormType, reset: () => void) => {
		try {
			dispatch(setLoading(true))
			const responseData = await volleyballPredictService.submitPrediction(data)

			if (responseData) {
				if (data.predictType === 'block') {
					setBlockAnalyses({
						predict: responseData.predict,
						jumpHeightAnalysis: responseData.jumpHeightAnalysis,
						reactionTimeAndSpeedAnalysis:
							responseData.reactionTimeAndSpeedAnalysis,
						armAnglesAnalysis: responseData.armAnglesAnalysis,
						bodySymmetryAnalysis: responseData.bodySymmetryAnalysis,
					}),
						dispatch(setCrrPredictType('block'))
				}
			} else {
				toast.error('No data found in the response')
			}
		} catch (error) {
			console.error('Error during prediction:', error)
			toast.error('Error on predict')
		} finally {
			dispatch(setLoading(false))
			reset()
		}
	}

	return (
		<main className="flex flex-col w-full h-full">
			<section className="flex items-center justify-center ">
				<FormSubmitVideo
					isLoading={loading}
					onSubmit={onSubmit}
					predicOptions={PREDICTOPTIONS}
				/>
			</section>

			{blockAnalyses && predType === 'block' && (
				<PredictResults predictData={blockAnalyses} />
			)}
		</main>
	)
}
