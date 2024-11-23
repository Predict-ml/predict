import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useAuthStorage } from '@/hooks/useAuthStorage'
import { BrainCircuit, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from '../../components/NavLink'
import { Button } from '../../components/ui/button/button'

export const SheetAppMobile = () => {
	const [isOpened, setIsOpened] = useState(false)

	const { renderIfRouteIsAvailable } = useAuthStorage()

	const handleChangeOpen = () => {
		setIsOpened((prev) => !prev)
	}

	return (
		<Sheet onOpenChange={setIsOpened} open={isOpened}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0 md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Basculer le menu de navigation</span>
				</Button>
			</SheetTrigger>
			<SheetTitle hidden className="sr-only">
				Basculer le menu de navigation
			</SheetTitle>
			<SheetContent side="left" aria-describedby={undefined}>
				<nav className="grid gap-6 text-lg font-medium">
					<Link
						to="/"
						className="flex items-center gap-2 text-lg font-semibold"
					>
						<BrainCircuit className="h-6 w-6" />
						<span className="sr-only">Accueil Predict</span>
					</Link>
					{renderIfRouteIsAvailable(
						<NavLink onClick={handleChangeOpen} to="/run">
							Course
						</NavLink>,
						'run',
					)}
					{renderIfRouteIsAvailable(
						<NavLink onClick={handleChangeOpen} to="/volleyball">
							Volley-ball
						</NavLink>,
						'volleyball',
					)}
					{renderIfRouteIsAvailable(
						<NavLink onClick={handleChangeOpen} to="/volleyball/management">
							Gestion du volley-ball
						</NavLink>,
						'volleyball',
					)}
					{renderIfRouteIsAvailable(
						<NavLink onClick={handleChangeOpen} to="/predictions-results">
							Résultats des prédictions de volley-ball
						</NavLink>,
						'volleyball',
					)}

					{renderIfRouteIsAvailable(
						<NavLink onClick={handleChangeOpen} to="/questions">
							Questions quotidiennes
						</NavLink>,
						'volleyballAthlete',
					)}
					{renderIfRouteIsAvailable(
						<NavLink onClick={handleChangeOpen} to="/admin">
							Administrateur
						</NavLink>,
						'admin',
					)}
				</nav>
			</SheetContent>
		</Sheet>
	)
}
