import { FormSubmitVideo, FormType } from '@/components/FormSubmitVideo'
import { ReportRunSection } from '@/components/ReportRunSection'
import { useAppTitle } from '@/hooks/useAppTitle'
import { api } from '@/lib/axios'
import { useAppSelector } from '@/store'
import {
	PredictRunStats,
	startPredictData,
} from '@/store/slices/predictRunSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const PREDICTOPTIONS = [
	'walk',
	//  'speed', 'distance', 'time'
]

export const Run = () => {
	useAppTitle({ title: 'Corrida' })

	const outputFileUrl = useAppSelector(
		(state) => state.predictRunSlice.outputFileUrl,
	)
	const predict = useAppSelector((state) => state.predictRunSlice.predict)

	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const onSubmit = async (data: FormType, reset: () => void) => {
		let formData = new FormData()

		formData.append('file', data.file)
		formData.append('predictType', data.predictType)

		setLoading(true)
		//TODO: use predict tipe to change endpoint

		api
			.post('/predict/run/treadmill', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				const data = response.data

				'outputFileUrl' in data
					? dispatch(
							startPredictData({
								outputFileUrl: data.outputFileUrl,
								predict: data.predict,
							}),
						)
					: dispatch(
							startPredictData({
								outputFileUrl: '',
								predict: {} as PredictRunStats,
							}),
						)
			})
			.catch((error) => {
				console.error(error)
				toast.error('Error on predict')
			})
			.finally(() => {
				setLoading(false)
			})

		reset()
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
			{outputFileUrl && (
				<ReportRunSection outputFileUrl={outputFileUrl} predict={predict} />
			)}
		</main>
	)
}
