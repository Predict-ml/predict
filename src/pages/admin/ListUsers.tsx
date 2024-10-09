import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Helmet } from 'react-helmet-async'

import { FilterUsersByAdmin } from '@/components/FilterUsersByAdmin'

import CreateAccountModal from '@/components/CreateAccountModal'
import { useAppTitle } from '@/hooks/useAppTitle'
import appUsersService from '@/services/appUsers/appUsersServices'
import { useAppSelector } from '@/store'
import { startUsers } from '@/store/slices/appUsersSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { UsersTableRow } from '../../components/UsersTableRow'

export const ListUsers = () => {
	const [searchParams, _] = useSearchParams()

	const status = searchParams.get('status')
	const customerName = searchParams.get('customerName')

	useAppTitle({ title: 'Usuários' })

	const appUsers = useAppSelector((state) => state.appUsers.users)
	const dispatch = useDispatch()

	const { listUsers: listAppUsers } = appUsersService

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users = await listAppUsers({
					customerName: customerName || '',
					status: status === 'all' ? undefined : status || '',
				})

				if ('message' in users) {
					console.error('Erro ao buscar usuários:', users.message)
					toast.error('Erro ao buscar usuários')
					return
				}

				dispatch(startUsers(users))
			} catch (error) {
				console.error('Erro ao buscar usuários:', error)
				toast.error('Erro ao buscar usuários')
			}
		}

		fetchUsers()
	}, [customerName, status])

	return (
		<>
			<Helmet title="Usuarios" />

			<div className="space-y-6 mx-auto w-full p-4 max-w-5xl  ">
				<CreateAccountModal />
				<FilterUsersByAdmin />

				<div className="    ">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-1/2 min-w-[150px]">Nome</TableHead>
								<TableHead className="w-1/2 min-w-[150px]">Email</TableHead>
								<TableHead className="min-w-[120px] ">Cargo</TableHead>

								<TableHead className="w-[80px]">Editar</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{appUsers?.map((user) => (
								<UsersTableRow
									key={user.id}
									id={user.id}
									email={user.email}
									name={user.name}
									cargo={user.role}
								/>
							))}

							{appUsers?.length === 0 && (
								<TableRow>
									<TableCell colSpan={4} className="text-center">
										Nenhum usuário encontrado
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
