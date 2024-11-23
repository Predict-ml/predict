import {
	Activity,
	AreaChart,
	FolderKanban,
	MessageCircleQuestion,
	ShieldMinus,
	Triangle,
} from 'lucide-react'
import VolleyBall from '../../assets/icons/VolleyBall'

import { Button } from '@/components/ui/button/button'
import { TooltipProvider } from '@/components/ui/tooltip'

import { useAuthStorage } from '@/hooks/useAuthStorage'
import { CustomToolTip } from '../../components/CustomToolTip'

export const AppAside = () => {
	const { renderIfRouteIsAvailable } = useAuthStorage()
	return (
		<TooltipProvider>
			<aside className=" hidden md:flex h-full flex-col border-r">
				<div className="sticky top-0">
					<div className="border-b p-2 min-h-[56.8px] max-h-[56.8px]">
						<Button variant="outline" size="icon" aria-label="Accueil">
							<Triangle className="size-5 fill-foreground" />
						</Button>
					</div>
					<nav className="grid gap-1 p-2">
						{renderIfRouteIsAvailable(
							<CustomToolTip
								to="/run"
								icon={<Activity className="size-5" />}
								label="Course"
							/>,
							'run',
						)}
						{renderIfRouteIsAvailable(
							<CustomToolTip
								to="/volleyball"
								icon={<VolleyBall className="size-5" />}
								label="Volley-ball"
							/>,
							'volleyball',
						)}
						{renderIfRouteIsAvailable(
							<CustomToolTip
								to="/volleyball/management"
								icon={<FolderKanban className="size-5" />}
								label="Gestion du volley-ball"
							/>,
							'volleyball',
						)}
						{renderIfRouteIsAvailable(
							<CustomToolTip
								to="/predictions-results"
								icon={<AreaChart className="size-5" />}
								label="Résultats des prédictions de volley-ball"
							/>,
							'volleyball',
						)}
						{renderIfRouteIsAvailable(
							<CustomToolTip
								to="/questions"
								icon={<MessageCircleQuestion className="size-5" />}
								label="Questions quotidiennes"
							/>,
							'volleyballAthlete',
						)}
						{renderIfRouteIsAvailable(
							<CustomToolTip
								to="/admin"
								icon={<ShieldMinus className="size-5" />}
								label="Administrateur"
							/>,
							'admin',
						)}
					</nav>
				</div>
			</aside>
		</TooltipProvider>
	)
}
