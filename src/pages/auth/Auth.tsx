import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStorage } from '@/hooks/useAuthStorage'
import { login } from '@/services/login'

const loginSchema = z.object({
	email: z.string().email('E-mail inválido').min(4, 'E-mail inválido '),
	password: z.string().min(1, 'campo obrigatório'),
})

type LoginSchema = z.infer<typeof loginSchema>

export const Auth = () => {
	const [passwordVisibility, setPasswordVisibility] = useState(false)

	const { signin } = useAuthStorage()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginSchema) => {
		try {
			const response = await login({
				email: data.email.trim().toLocaleLowerCase(),
				password: data.password,
			})

			if ('message' in response) {
				return toast.error(response.message)
			}

			const { token, user } = response

			console.log(user.status)

			signin({
				jwt: token,
				email: user.email,
				name: user.name,
				roles: user.role,
				id: user.id,
				statusAthlete: user.status || false,
			})

			toast.success('accueillir')

			if (user.status) {
				toast('You already submitted the form today', {
					duration: 10000,
				})
			}
		} catch (_error) {
			toast.error('Error on login')
		}
	}

	return (
		<>
			<Helmet title="Login" />

			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									className="data-[haserror]:focus-visible:ring-red-500 data-[haserror]:border-red-500"
									data-haserror={errors.email?.message}
									{...register('email')}
								/>
								{errors.email?.message && (
									<span className="text-red-400">{errors.email?.message}</span>
								)}
							</div>
							<div className="relative space-y-2	">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type={passwordVisibility ? 'text' : 'password'}
									{...register('password')}
									className="data-[haserror]:focus-visible:ring-red-500 data-[haserror]:border-red-500"
									data-haserror={errors.password?.message}
								/>
								{errors.password && (
									<span className="text-red-500">
										{errors.password?.message}
									</span>
								)}
								<div className="absolute right-0 top-6">
									<Button
										onClick={() => setPasswordVisibility((prev) => !prev)}
										type="button"
										size="icon"
										variant="ghost"
										className="hover:bg-transparent"
									>
										{passwordVisibility ? <EyeOff /> : <Eye />}
										<span className="sr-only">
											{passwordVisibility ? 'Ocultar senha' : 'Mostrar senha'}
										</span>
									</Button>
								</div>
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</>
	)
}
