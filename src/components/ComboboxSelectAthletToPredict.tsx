import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button/button'
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Controller, useFormContext } from 'react-hook-form'

import { SpinnerLoading } from '@/components/SpinnerLoading'
import { predictionService } from '@/services/predictStoraged/predictStoraged'
import { useAppSelector } from '@/store'
import { setAthletes, setLoading } from '@/store/slices/storedAnalisesSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { FormType } from './FormSubmitVideo'

export function ComboboxSelectAthletToPredict() {
	const [open, setOpen] = useState(false)
	const [selectedAthlete, setSelectedAthlete] = useState<{
		name: string
		id: number | undefined
	}>({ name: '', id: undefined })
	const [inputValue, setInputValue] = useState('')

	const athletes = useAppSelector((state) => state.storedAnalyses.athletes)
	const loading = useAppSelector((state) => state.storedAnalyses.loading)
	const dispatch = useDispatch()

	const { listAthletesWithPredictionCount } = predictionService

	const {
		control,
		setValue,
		formState: { isSubmitSuccessful },
	} = useFormContext<FormType>()

	useEffect(() => {
		const fetchAthletes = async () => {
			dispatch(setLoading(true))

			try {
				const athletesData = await listAthletesWithPredictionCount()

				if ('message' in athletesData) {
					toast.error('Erreur lors de la récupération des athlètes :')
					return
				}

				dispatch(setAthletes(athletesData))
			} catch (error) {
				console.error('Erreur lors de la récupération des athlètes :', error)
			} finally {
				dispatch(setLoading(false))
			}
		}

		if (open) {
			fetchAthletes()
			setInputValue('')
		}
		if (open && isSubmitSuccessful) {
			setSelectedAthlete({ name: '', id: undefined })
		}
	}, [open])

	const handleSelect = (
		setSelectedValue: Dispatch<
			SetStateAction<{ name: string; id: number | undefined }>
		>,
		athlete: { name: string; id: number | undefined },
		setOpen: Dispatch<SetStateAction<boolean>>,
		isNewAthlete: boolean = false,
	) => {
		setSelectedValue(
			isNewAthlete ? { name: athlete.name, id: undefined } : athlete,
		)

		if (isNewAthlete) {
			setValue('newGuestAthlete', athlete.name)
		} else {
			setValue('newGuestAthlete', undefined)
		}
		setOpen(false)
	}

	return (
		<Controller
			name="athleteID"
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className="flex flex-col gap-2">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={open}
								className="w-[230px] justify-between"
								disabled={loading}
							>
								{selectedAthlete.name || 'Sélectionnez un athlète...'}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0" align="start">
							{loading ? (
								<div className="p-4">
									<SpinnerLoading />
								</div>
							) : (
								<Command>
									<CommandInput
										placeholder="Rechercher un athlète..."
										value={inputValue}
										onValueChange={setInputValue}
									/>
									<CommandList>
										<CommandGroup>
											{athletes?.map((athlete) => (
												<CommandItem
													key={athlete.id}
													value={athlete.name}
													onSelect={() => {
														handleSelect(setSelectedAthlete, athlete, setOpen)
														field.onChange(athlete.id)
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															selectedAthlete.id === athlete.id
																? 'opacity-100'
																: 'opacity-0',
														)}
													/>
													{athlete.name}
												</CommandItem>
											))}
											{inputValue && (
												<CommandItem
													value={inputValue}
													onSelect={() => {
														handleSelect(
															setSelectedAthlete,
															{ name: inputValue, id: undefined },
															setOpen,
															true,
														)
														field.onChange()
													}}
												>
													Ajouter "{inputValue}"
												</CommandItem>
											)}
										</CommandGroup>
									</CommandList>
								</Command>
							)}
						</PopoverContent>
					</Popover>
					{error && (
						<span className=" text-red-500">
							La sélection d'un athlète est obligatoire
						</span>
					)}
				</div>
			)}
		/>
	)
}
