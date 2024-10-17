import { useState } from 'react'
import { EditUserDataTabs } from './EditUserDataTabs/EditUserDataTabs'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

export function ModalEditUser() {
	const [isOpen, setIsOpen] = useState(false)

	const handleCloseModal = () => {
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button
					className="relative flex cursor-default select-none items-center
				rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent
				focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50
				w-full
				"
				>
					Paramètres
				</button>
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="rounded-lg pt-10 ">
				<DialogTitle />
				<EditUserDataTabs handleCloseModal={handleCloseModal} />
			</DialogContent>
		</Dialog>
	)
}
