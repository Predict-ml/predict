import { FileInput } from '@/components/InputFile'
import { SelectPredict } from '@/components/SelectPredict'
import { Button } from '@/components/ui/button/button'

import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ComboboxSelectAthletToPredict } from './ComboboxSelectAthletToPredict'
import { Label } from './ui/label'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'video/mp4']

const schema = z.object({
	file: z
		.any()
		.refine((file) => file !== null && file !== undefined, 'Champ obligatoire')
		.refine(
			(file) => file?.size <= MAX_FILE_SIZE,
			`La taille maximale du fichier est de 100 Mo.`,
		)
		.refine((file) => {
			return ACCEPTED_IMAGE_TYPES.includes(file?.type)
		}, 'Seuls les formats .mp4 sont pris en charge.'),
	predictType: z.string().min(1, 'Champ obligatoire'),
	athleteID: z.number().optional(),
	newGuestAthlete: z.string().optional(),
})

export type FormType = z.infer<typeof schema>

interface FormSubmitVideoProps {
	onSubmit: (data: FormType, reset: () => void) => void
	isLoading: boolean
	predicOptions: string[]
}

export const FormSubmitVideo = ({
	isLoading,
	onSubmit,
	predicOptions,
}: FormSubmitVideoProps) => {
	const methods = useForm<FormType>({
		defaultValues: {
			file: null,
			predictType: '',
		},
		resolver: zodResolver(schema),
	})

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = methods

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit((data) => {
					onSubmit(data, reset)
				})}
				className="w-full md:w-1/2 max-w-lg flex p-6 flex-col gap-8"
			>
				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="file">Fichier</Label>
					<FileInput />
					{errors.file?.message && (
						<span className="text-red-500">{String(errors.file.message)}</span>
					)}
				</div>
				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="file">Type de prédiction</Label>
					<SelectPredict
						placeholder="Sélectionnez le type de prédiction"
						options={predicOptions}
					/>
					{errors.predictType && (
						<span className="text-red-500">
							{String(errors.predictType.message)}
						</span>
					)}
				</div>

				<ComboboxSelectAthletToPredict />

				<Button
					type="submit"
					disabled={isSubmitting || isLoading}
					className="flex items-center justify-center gap-4"
				>
					{isLoading && (
						<div className="size-5 border-2 border-blue-500 border-solid rounded-full border-t-transparent animate-spin" />
					)}

					<span>Soumettre</span>
				</Button>
			</form>
		</FormProvider>
	)
}
