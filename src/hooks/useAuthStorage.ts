import { useAppSelector } from '@/store'
import { clearUser, setUser } from '@/store/slices/userSlice'
import { ReactNode, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const APP_KEY = 'APP_KEY'

export const useAuthStorage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useAppSelector((state) => state.user)

	const signin = ({
		jwt,
		email,
		name,
		roles,
		id,
		statusAthlete,
	}: {
		jwt: string
		id: number
		email: string
		name: string
		roles: string[]
		statusAthlete: boolean
	}) => {
		localStorage.setItem(APP_KEY, jwt)

		dispatch(
			setUser({ email, name, roles, id, isLoadingUser: false, statusAthlete }),
		)

		navigate(getDefaultRoute(roles), { replace: true })
	}

	const signout = () => {
		localStorage.removeItem(APP_KEY)
		dispatch(clearUser())
		navigate('/auth', { replace: true })
	}

	const getJwt = (): string | null => {
		return localStorage.getItem(APP_KEY)
	}

	const roleRoutes: { [key: string]: string } = {
		run: '/run',
		volleyball: '/volleyball',
		admin: '/admin',
		volleyballAthlete: '/questions',
	}

	const getDefaultRoute = (roles: string[]): string => {
		const route = roles.find((role) => roleRoutes[role])
		return route ? roleRoutes[route] : '/'
	}

	// Função que verifica as rotas disponíveis com base nos papéis do usuário
	const availableRoutes = useMemo(() => {
		return Object.keys(roleRoutes).filter((role) => user.roles.includes(role))
	}, [user.roles])

	const renderIfRouteIsAvailable = (children: ReactNode, role: string) => {
		if (availableRoutes.includes(role) || availableRoutes.includes('admin'))
			return children
	}

	const ROLES = Object.keys(roleRoutes)

	return {
		signin,
		signout,
		getJwt,
		getDefaultRoute,
		renderIfRouteIsAvailable,
		roleRoutes,
		availableRoutes,
		ROLES,
	}
}
