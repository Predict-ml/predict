import { api } from '@/lib/axios'
import { athleteFormType } from '@/schemas/AthleteFormSchema'
import axios from 'axios'

interface SubmitAthleteFormSuccess {
	success: boolean
}

interface SubmitAthleteFormError {
	message: string
}

type SubmitAthleteFormResponse =
	| SubmitAthleteFormSuccess
	| SubmitAthleteFormError

export const AthleteFormSubmitService = async (
	data: athleteFormType,
): Promise<SubmitAthleteFormResponse> => {
	try {
		const response = await api.post('/submit-athlete-form', data)

		if (response.status === 204) {
			return {
				success: true,
			} as SubmitAthleteFormSuccess
		}

		throw new Error('Échec de la soumission')
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return {
				message:
					error.response.data.message || 'Une erreur inconnue est survenue',
			} as SubmitAthleteFormError
		}

		return {
			message: 'Erreur de réseau ou du serveur',
		} as SubmitAthleteFormError
	}
}
