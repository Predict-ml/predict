import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button/button'

interface CustomToolTipProps {
	icon: ReactNode
	label: string
	to: string
}
export const CustomToolTip = ({ icon, label, to }: CustomToolTipProps) => {
	const { pathname } = useLocation()

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-lg data-[current=true]:bg-muted "
					data-current={pathname === to}
					aria-label={label}
					asChild
				>
					<Link to={to}>{icon}</Link>
				</Button>
			</TooltipTrigger>
			<TooltipContent side="right" sideOffset={5}>
				{label}
			</TooltipContent>
		</Tooltip>
	)
}