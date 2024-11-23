import { Link } from 'react-router-dom'

export function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold">Page non trouvée</h1>
			<p className="text-accent-foreground">
				Retourner au
				<Link to="/" className="text-sky-600 dark:text-sky-400">
					Dashboard
				</Link>
			</p>
		</div>
	)
}
