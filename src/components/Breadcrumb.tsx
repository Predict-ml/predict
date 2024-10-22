import { Button } from '@/components/ui/button/button'
import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface BreadcrumbProps {
	basePathName?: string
	basePath?: string
}

const Breadcrumb = ({
	basePathName = 'Home',
	basePath = '/',
}: BreadcrumbProps) => {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter((x) => x)

	return (
		<nav className="flex items-center space-x-2 text-sm">
			<Button variant="link" size="link" asChild>
				<Link to={basePath}>{basePathName}</Link>
			</Button>

			{pathnames.map((value, index) => {
				const to = `/${pathnames.slice(0, index + 1).join('/')}`
				const isLast = index === pathnames.length - 1

				return (
					<div key={to} className="flex items-center space-x-2">
						<ChevronRight className="w-4 h-4 text-gray-500" />
						{isLast ? (
							<span className="text-gray-500">{decodeURIComponent(value)}</span>
						) : (
							<Button variant="link" size="link" asChild>
								<Link to={to}>
									{decodeURIComponent(value.split('-').join(' '))}
								</Link>
							</Button>
						)}
					</div>
				)
			})}
		</nav>
	)
}

export default Breadcrumb
