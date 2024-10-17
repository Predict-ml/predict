import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabAccount } from './TabAccount'
import { TabPassword } from './TabPassword'

export function EditUserDataTabs({
	handleCloseModal,
}: {
	handleCloseModal: () => void
}) {
	return (
		<Tabs defaultValue="account" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="account">Compte</TabsTrigger>
				<TabsTrigger value="password">Mot de passe</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<TabAccount handleCloseModal={handleCloseModal} />
			</TabsContent>
			<TabsContent value="password">
				<TabPassword handleCloseModal={handleCloseModal} />
			</TabsContent>
		</Tabs>
	)
}
