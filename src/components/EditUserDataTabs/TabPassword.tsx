import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import appUsersService from '@/services/appUsers/appUsersServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button/button'

const passwordSchema = z.object({
	currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
	newPassword: z
		.string()
		.min(6, 'Le nouveau mot de passe doit comporter au moins 6 caractères'),
})

type PasswordSchema = z.infer<typeof passwordSchema>

export const TabPassword = ({
	handleCloseModal,
}: { handleCloseModal: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordSchema>({
		resolver: zodResolver(passwordSchema),
	})

	const onSubmit = async ({ currentPassword, newPassword }: PasswordSchema) => {
		try {
			const response = await appUsersService.selfUpdatePassword({
				oldPassword: currentPassword,
				newPassword,
			})

			if ('message' in response) {
				toast.error(response.message)
				return
			}

			if (response.success) {
				toast.success('Mot de passe mis à jour avec succès')
				handleCloseModal()
				return
			}
		} catch (error) {
			console.error(error)
			toast.error('Erreur lors de la mise à jour du mot de passe')
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Mot de passe</CardTitle>
				<CardDescription>
					Changez votre mot de passe ici. Après avoir enregistré, vous serez
					déconnecté.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="currentPassword">Mot de passe actuel</Label>
						<Input
							id="currentPassword"
							type="password"
							{...register('currentPassword')}
						/>
						{errors.currentPassword && (
							<p className="text-red-500">
								{errors.currentPassword.message?.toString()}
							</p>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="newPassword">Nouveau mot de passe</Label>
						<Input
							id="newPassword"
							type="password"
							{...register('newPassword')}
						/>
						{errors.newPassword && (
							<p className="text-red-500">
								{errors.newPassword.message?.toString()}
							</p>
						)}
					</div>
					<Button type="submit">Enregistrer le mot de passe</Button>
				</form>
			</CardContent>
		</Card>
	)
}
