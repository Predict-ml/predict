import { Button } from '@/components/ui/button/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAppSelector } from '@/store'
import { User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ModalEditUser } from '../components/ModalEditUser'

export const DropDownUserSettings = () => {
	const user = useAppSelector((state) => state.user)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" className="rounded-full">
					<User className="h-5 w-5" />
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{user.name || 'User'}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ModalEditUser />
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link to="/logout">Déconnexion</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
