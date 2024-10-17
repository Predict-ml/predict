import { api } from '@/lib/axios'
import { Athlete } from '@/store/slices/athletesSlice'
import axios from 'axios'

// Interfaces for success or error responses
interface CreateAthleteSuccess {
	id: number
	email: string
	name: string
	status: boolean
}

type ListAthletesSuccess = Athlete[]

interface ListAthletsQuery {
	athleteName?: string
	status?: string
}

type GetAthleteSuccess = Athlete

type UpdateAthleteSuccess = Omit<Athlete, 'status'>

interface DeleteUserSuccess {
	success: boolean
}

// Typing possible errors
interface ServiceError {
	message: string
}

// Types of responses for each operation
type CreateAthleteResponse = CreateAthleteSuccess | ServiceError
type ListAthletesResponse = ListAthletesSuccess | ServiceError
type GetAthleteResponse = GetAthleteSuccess | ServiceError
type UpdateAthleteResponse = UpdateAthleteSuccess | ServiceError
type DeleteUserResponse = DeleteUserSuccess | ServiceError

const athletesService = {
	createAthlete: async (data: {
		name: string
		email: string
		password: string
	}): Promise<CreateAthleteResponse> => {
		try {
			const response = await api.post('/users/create-volleyball-thlete', data)
			return response.data as CreateAthleteSuccess
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

	listAthletes: async ({
		athleteName,
		status,
	}: ListAthletsQuery): Promise<ListAthletesResponse> => {
		try {
			const searchParams = new URLSearchParams()

			if (athleteName) {
				searchParams.append('athleteName', athleteName)
			}
			if (status) {
				searchParams.append('status', status)
			}

			const response = await api.get(
				`/users/list-volleyball-thletes?${searchParams.toString()}`,
			)
			return response.data as ListAthletesSuccess
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

	getAthlete: async (id: number): Promise<GetAthleteResponse> => {
		try {
			const response = await api.get(`/athletes/${id}`)
			return response.data as GetAthleteSuccess
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

	updateAthlete: async (
		id: number,
		data: {
			name?: string
			email?: string
		},
	): Promise<UpdateAthleteResponse> => {
		try {
			const response = await api.put(`/users/${id}`, data)
			return response.data as UpdateAthleteSuccess
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

	deleteAthlete: async (id: number): Promise<DeleteUserResponse> => {
		try {
			const response = await api.delete(`/users/${id}`)

			if (response.status === 204) {
				return { success: true }
			}

			return { message: "Une erreur inconnue s'est produite" } as ServiceError
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

	resetPassword: async (id: number): Promise<DeleteUserResponse> => {
		try {
			const response = await api.patch(`/users/resetPassword/${id}`)

			if (response.status === 204) {
				return { success: true }
			}

			throw new Error("Une erreur inconnue s'est produite")
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

export default athletesService
