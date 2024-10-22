import { Button } from '@/components/ui/button/button'

import { TableCell, TableRow } from '@/components/ui/table'
import { Link as LinkIcon } from 'lucide-react'

import { Link } from 'react-router-dom'

interface AthleteManagementTableRowProps {
	id: number
	name: string
	analysesCount: number
}

export const AthletePredictsListResultsTableRow = ({
	id,
	name,

	analysesCount,
}: AthleteManagementTableRowProps) => {
	return (
		<TableRow>
			<TableCell className=" font-medium">{name}</TableCell>

			<TableCell className="text-center">{analysesCount}</TableCell>

			<TableCell>
				<Button variant={'ghost'} size={'sm'} asChild>
					<Link to={analysesCount === 0 ? '' : `/predictions-results/${id}`}>
						<LinkIcon />
						<span className="sr-only">Voir les analyses</span>
					</Link>
				</Button>
			</TableCell>
		</TableRow>
	)
}
