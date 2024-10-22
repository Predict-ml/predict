import { BrainCircuit, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import { TooltipProvider } from '@/components/ui/tooltip'

import { CustomToolTip } from '../../components/CustomToolTip'

export const AdminAside = () => {
	return (
		<TooltipProvider>
			<aside className=" hidden md:flex h-full flex-col border-r">
				<div className="sticky top-0">
					<div className="border-b p-2 min-h-[56.8px] max-h-[56.8px]">
						<Button variant="outline" size="icon" aria-label="Home">
							<Triangle className="size-5 fill-foreground" />
						</Button>
					</div>
					<nav className="grid gap-1 p-2">
						<CustomToolTip
							to="/run"
							icon={<BrainCircuit className="size-5" />}
							label="App"
						/>
					</nav>
				</div>
			</aside>
		</TooltipProvider>
	)
}
