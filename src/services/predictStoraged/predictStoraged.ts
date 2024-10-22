import { api } from '@/lib/axios'
import { WalkAnalysis } from '@/store/slices/storedAnalisesSlice'
import axios from 'axios'

export interface AthleteWithPredictionCount {
	id: number
	name: string
	_count: {
		Prediction: number
	}
}

interface Prediction {
	id: number
	subCategory: string
	createdAt: string
}

interface AthleteWithPredictions {
	name: string
	Prediction: Prediction[]
}

interface PredictionDetails {
	id: number
	subCategory: string
	createdAt: Date
	walkAnalysis: WalkAnalysis | null
	blockAnalysis: any | null
}

interface ServiceError {
	message: string
}

type ListPredictionsForAthleteSuccess = AthleteWithPredictions
type ListPredictionsForAthleteResponse =
	| ListPredictionsForAthleteSuccess
	| ServiceError

type ListAthletesWithPredictionCountSuccess = AthleteWithPredictionCount[]
type ListAthletesWithPredictionCountResponse =
	| ListAthletesWithPredictionCountSuccess
	| ServiceError

type PredictionDetailsResponse = PredictionDetails | ServiceError

export const predictionService = {
	listAthletesWithPredictionCount: async (
		athleteName?: string,
	): Promise<ListAthletesWithPredictionCountResponse> => {
		try {
			const query = athleteName
				? `?athleteName=${encodeURIComponent(athleteName)}`
				: ''
			const response = await api.get(`/predict/storaged${query}`)
			return response.data as ListAthletesWithPredictionCountSuccess
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message:
						error.response.data.message || "Une erreur inconnue s'est produite",
				} as ServiceError
			}
			return { message: 'Erreur réseau ou serveur' } as ServiceError
		}
	},

	listPredictionsForAthlete: async (
		userId: string,
	): Promise<ListPredictionsForAthleteResponse> => {
		try {
			const response = await api.get(`/predict/storaged/${userId}`)
			return response.data as ListPredictionsForAthleteSuccess
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message:
						error.response.data.message || "Une erreur inconnue s'est produite",
				} as ServiceError
			}
			return { message: 'Erreur réseau ou serveur' } as ServiceError
		}
	},

	getPredictionDetails: async (
		userID: string,
		predictID: string,
	): Promise<PredictionDetailsResponse> => {
		try {
			const response = await api.get(`/predict/storaged/${userID}/${predictID}`)
			return response.data as PredictionDetails
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message:
						error.response.data.message || "Une erreur inconnue s'est produite",
				} as ServiceError
			}
			return { message: 'Erreur réseau ou serveur' } as ServiceError
		}
	},
}
