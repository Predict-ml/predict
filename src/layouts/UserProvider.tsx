import { useLoadUser } from '@/hooks/useLoadUser/useLoadUser'
import { ReactNode } from 'react'

interface UserProviderProps {
	children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
	useLoadUser()

	return <>{children}</>
}
