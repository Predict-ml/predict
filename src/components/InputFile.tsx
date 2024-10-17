import { Button } from '@/components/ui/button/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { File as FileIcon, Upload, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

interface InputProps {
	dropzone: ReturnType<typeof useDropzone>
}

interface HasFileProps {
	file?: File
	removeFile: () => void
}

const Input = ({ dropzone }: InputProps) => {
	const { getRootProps, getInputProps, isDragActive } = dropzone

	return (
		<div
			{...getRootProps()}
			className={cn(
				'w-full h-full min-h-[184px] rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-gray-100 transition-all',
				isDragActive ? 'border-blue-500' : 'border-gray-300',
			)}
		>
			<label
				htmlFor="dropzone-file"
				className="cursor-pointer w-full h-full flex items-center justify-center p-6"
			>
				<div className="text-center">
					<Upload
						className={cn(
							'w-10 h-10 mb-3',
							isDragActive ? 'text-blue-500' : 'text-gray-400',
						)}
					/>
					{isDragActive ? (
						<p className="font-bold text-lg text-blue-400">
							Déposez pour ajouter
						</p>
					) : (
						<>
							<p className="mb-2 text-lg text-gray-500">
								<span className="font-bold">Cliquez pour télécharger</span> ou
								glissez-déposez ici
							</p>
							<p className="text-gray-400 text-sm">Seulement MP4</p>
						</>
					)}
				</div>
			</label>
			<input {...getInputProps()} className="hidden" />
		</div>
	)
}

const HasFile = ({ file, removeFile }: HasFileProps) => {
	return (
		<Card
			className="w-full h-full flex justify-center items-center p-4
		min-h-[184px] border-gray-500 bg-gray-100 border-dashed  border-2"
		>
			<CardContent className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50">
				<Button
					className="size-5 text-gray-500"
					size={'icon'}
					variant={'ghost'}
				>
					<FileIcon />
				</Button>
				<span className="text-sm text-gray-700">{file?.name}</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={removeFile}
					className="ml-auto"
				>
					<X className="w-5 h-5 text-red-500" />
				</Button>
			</CardContent>
		</Card>
	)
}

export const FileInput = () => {
	const [file, setFile] = useState<File | null>(null)

	const {
		setValue,
		formState: { isSubmitSuccessful },
	} = useFormContext()

	const removeFile = useCallback(() => {
		setFile(null)
		setValue('file', null)
	}, [setValue])

	const onDrop = useCallback(
		(files: File[]) => {
			setFile(files[0])
			setValue('file', files[0])
		},
		[setValue],
	)

	useEffect(() => {
		if (isSubmitSuccessful) {
			setFile(null)
		}
	}, [isSubmitSuccessful])

	const dropzone = useDropzone({
		onDrop,
		accept: {
			'video/mp4': ['.mp4'],
		},
	})

	if (file) return <HasFile file={file} removeFile={removeFile} />

	return <Input dropzone={dropzone} />
}
