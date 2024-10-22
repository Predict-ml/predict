import { AppDispatch, useAppSelector } from '@/store'
import {
	fetchUser as fetchUserRdx,
	setIsLoadingUser,
} from '@/store/slices/userSlice'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APP_KEY } from '../useAuthStorage'

export const useLoadUser = () => {
	const dispatch = useDispatch<AppDispatch>()
	const user = useAppSelector((state) => state.user)

	const fetchUser = useCallback(async () => {
		const token = localStorage.getItem(APP_KEY)
		if (token) {
			try {
				dispatch(setIsLoadingUser(true))
				await dispatch(fetchUserRdx())
			} catch (_error) {
				console.error('Erro ao carregar usuário')
			} finally {
				dispatch(setIsLoadingUser(false))
			}
		}
	}, [])

	useEffect(() => {
		const isUserDefault =
			!user ||
			!user.id ||
			!user.name ||
			!user.email ||
			!Array.isArray(user.roles) ||
			user.roles.length === 0

		if (isUserDefault) {
			fetchUser()
		}
	}, [])
}
