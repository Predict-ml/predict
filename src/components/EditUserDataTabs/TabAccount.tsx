import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import appUsersService from '@/services/appUsers/appUsersServices'
import { useAppSelector } from '@/store'
import { setUser } from '@/store/slices/userSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button/button'

const accountSchema = z.object({
	name: z.string().min(1, 'Le nom est obligatoire'),
	email: z.string().email('Adresse e-mail invalide'),
})

type AccountSchema = z.infer<typeof accountSchema>

export const TabAccount = ({
	handleCloseModal,
}: { handleCloseModal: () => void }) => {
	const userData = useAppSelector((state) => state.user)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountSchema>({
		resolver: zodResolver(accountSchema),
		defaultValues: {
			name: userData.name,
			email: userData.email,
		},
	})

	const onSubmit = async (data: AccountSchema) => {
		try {
			const response = await appUsersService.selfUpdateAccount(data)

			if ('message' in response) {
				toast.error(response.message)
				return
			}

			if (response.success) {
				dispatch(
					setUser({
						name: data.name,
						email: data.email,
						roles: userData.roles,
						id: userData.id,
						statusAthlete: userData.statusAthlete,
						isLoadingUser: false,
					}),
				)
				toast.success('Compte mis à jour avec succès')
				handleCloseModal()
				return
			}
		} catch (error) {
			console.error(error)
			toast.error('Erreur lors de la mise à jour du compte')
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Compte</CardTitle>
				<CardDescription>
					Modifiez votre compte ici. Cliquez sur enregistrer lorsque vous avez
					terminé.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="name">Nom</Label>
						<Input
							id="name"
							placeholder="exemple de nom"
							{...register('name')}
						/>
						{errors.name && (
							<p className="text-red-500">{errors.name.message?.toString()}</p>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							placeholder="exemple@gmail.com"
							{...register('email')}
						/>
						{errors.email && (
							<p className="text-red-500">{errors.email.message?.toString()}</p>
						)}
					</div>
					<Button type="submit">Enregistrer les modifications</Button>
				</form>
			</CardContent>
		</Card>
	)
}
