import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'

const athletesFiltersSchema = z.object({
	athleteName: z.string().optional(),
})

type AthletesFiltersSchema = z.infer<typeof athletesFiltersSchema>

export function FilterPredictsWithAthletName() {
	const [searchParams, setSearchParams] = useSearchParams()

	const athlete = searchParams.get('athleteName')

	const { register, handleSubmit, reset } = useForm<AthletesFiltersSchema>({
		resolver: zodResolver(athletesFiltersSchema),
		defaultValues: {
			athleteName: athlete ?? '',
		},
	})

	function handleFilter({ athleteName }: AthletesFiltersSchema) {
		setSearchParams((state) => {
			if (athleteName) {
				state.set('athleteName', athleteName.trim())
			} else {
				state.delete('athleteName')
			}

			return state
		})
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete('athleteName')
			return state
		})

		reset({
			athleteName: '',
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex flex-wrap items-center gap-2"
		>
			<span className="text-sm font-semibold">Filtres :</span>
			<Input
				placeholder="Nom de l'athlète"
				className="h-8 w-[320px]"
				{...register('athleteName')}
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
				Effacer les filtres
			</Button>
		</form>
	)
}
