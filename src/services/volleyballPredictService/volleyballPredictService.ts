import { FormType } from '@/components/FormSubmitVideo'
import { api } from '@/lib/axios'

export interface PredictResponse {
	predict: {
		data: any
		layout: any
		frames: any
	}
	jumpHeightAnalysis?: string
	reactionTimeAndSpeedAnalysis?: string
	armAnglesAnalysis?: string
	bodySymmetryAnalysis?: string
}

export interface PredictBlockReturn {
	predict: {
		data: any
		layout: any
		frames: any
	}
	jumpHeightAnalysis?: {
		data: any
		layout: any
	}
	reactionTimeAndSpeedAnalysis?: {
		data: any
		layout: any
	}
	armAnglesAnalysis?: {
		data: any
		layout: any
	}
	bodySymmetryAnalysis?: {
		data: any
		layout: any
	}
}

export const volleyballPredictService = {
	async submitPrediction({
		predictType,
		...rest
	}: FormType): Promise<PredictBlockReturn> {
		const endpoint: Record<string, string> = {
			block: '/block',
			serve: '/serve',
			pass: '/pass',
		}

		const response = await api.post<PredictResponse>(
			`/predict/voley${endpoint[predictType]}`,
			{
				...rest,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)

		let responseData = response.data

		responseData.jumpHeightAnalysis = JSON.parse(
			responseData.jumpHeightAnalysis || '{}',
		)
		responseData.reactionTimeAndSpeedAnalysis = JSON.parse(
			responseData.reactionTimeAndSpeedAnalysis || '{}',
		)

		responseData.armAnglesAnalysis = JSON.parse(
			responseData.armAnglesAnalysis || '{}',
		)

		responseData.bodySymmetryAnalysis = JSON.parse(
			responseData.bodySymmetryAnalysis || '{}',
		)

		return responseData as PredictBlockReturn
	},
}
