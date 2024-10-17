import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const userFiltersSchema = z.object({
	customerName: z.string().optional(),
	status: z.string().optional(),
})

type UserFiltersSchema = z.infer<typeof userFiltersSchema>

export function FilterUsersByAdmin() {
	const [searchParams, setSearchParams] = useSearchParams()

	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } = useForm<UserFiltersSchema>(
		{
			resolver: zodResolver(userFiltersSchema),
			defaultValues: {
				customerName: customerName ?? '',
				status: status ?? 'all',
			},
		},
	)

	function handleFilter({ customerName, status }: UserFiltersSchema) {
		setSearchParams((state) => {
			if (customerName) {
				state.set('customerName', customerName.trim())
			} else {
				state.delete('customerName')
			}

			if (status) {
				state.set('status', status.trim())
			} else {
				state.delete('status')
			}

			return state
		})
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete('customerName')
			state.delete('status')

			return state
		})

		reset({
			customerName: '',
			status: 'all',
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex flex-wrap items-center gap-2"
		>
			<span className="text-sm font-semibold">Filtres :</span>
			<Input
				placeholder="Nom du client"
				className="h-8 w-[320px]"
				{...register('customerName')}
			/>
			<Controller
				name="status"
				control={control}
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							defaultValue="all"
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className="h-8 w-[180px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous les Statuts</SelectItem>
								<SelectItem value="run">Course</SelectItem>
								<SelectItem value="volleyball">Volleyball</SelectItem>
								<SelectItem value="volleyballAthlete">
									Athlète de volleyball
								</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>
			<Button variant="secondary" size="xs" type="submit">
				<Search className="mr-2 h-4 w-4" />
				Filtrer les résultats
			</Button>
			<Button
				onClick={handleClearFilters}
				variant="outline"
				size="xs"
				type="button"
			>
				<X className="mr-2 h-4 w-4" />
				Retirer les filtres
			</Button>
		</form>
	)
}
