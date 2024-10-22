import { cn } from '@/lib/utils'
import { predictData } from '@/store/slices/predictRunSlice'
import { ReactNode, useEffect, useRef } from 'react'
import { CustomPlot } from './CustomPlot'

interface TitleProps {
	children: ReactNode
	className?: string
}

const Title = ({ children, className }: TitleProps) => {
	return (
		<h2 className={cn('text-2xl font-bold text-gray-800 mb-4', className)}>
			{children}
		</h2>
	)
}

type ReportProps = predictData

export const ReportRunSection = ({ outputFileUrl, predict }: ReportProps) => {
	const {
		nome = 'Nom du Fichier',
		rightKneeAngleMean = 0,
		rightKneeAngleMin = 0,
		rightKneeAngleMax = 0,
		leftKneeAngleMean = 0,
		leftKneeAngleMin = 0,
		leftKneeAngleMax = 0,
		velocityMean = 0,
		velocityMax = 0,
		asymmetryMean = 0,
		asymmetryMax = 0,
		asymmetryJson,
		hipMovementJson,
		kneeAngleJson,
		velocityJson,
	} = predict

	// Corrigido para usar as variáveis em camelCase
	const asymmetryJsonParsed = JSON.parse(asymmetryJson)
	const hipMovementJsonParsed = JSON.parse(hipMovementJson)
	const kneeJsonParsed = JSON.parse(kneeAngleJson)
	const velocityJsonParsed = JSON.parse(velocityJson)

	const sectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])

	return (
		<section
			id="report-section"
			ref={sectionRef}
			className="w-full mx-auto bg-white max-w-6xl flex flex-col items-center"
		>
			<div className="p-8">
				<Title className="text-center mb-8 text-3xl">
					Analyse Cinématique de la Marche - {nome}
				</Title>
				<div className="flex justify-center mb-6">
					<video
						src={outputFileUrl}
						loop
						controls
						onLoadedData={() => console.log('Vidéo chargée')}
						onError={(e) => console.error('Erreur dans la vidéo', e)}
					/>
				</div>

				<div className="mb-6">
					<Title>Données Générales</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Fichier d'Entrée: {nome}</li>
						<li>Taux d'Échantillonnage: 30 fps</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Angles Articulaires</Title>
					<div className="mb-4">
						<strong className="block mb-2">Angle du Genou Droit</strong>
						<ul className="list-disc ml-5 text-lg text-gray-600">
							<li>Angle Minimum: {rightKneeAngleMin.toFixed(2)} degrés</li>
							<li>Angle Moyen: {rightKneeAngleMean.toFixed(2)} degrés</li>
							<li>Angle Maximum: {rightKneeAngleMax.toFixed(2)} degrés</li>
						</ul>
					</div>
					<div>
						<strong className="block mb-2">Angle du Genou Gauche</strong>
						<ul className="list-disc ml-5 text-lg text-gray-600">
							<li>Angle Minimum: {leftKneeAngleMin.toFixed(2)} degrés</li>
							<li>Angle Moyen: {leftKneeAngleMean.toFixed(2)} degrés</li>
							<li>Angle Maximum: {leftKneeAngleMax.toFixed(2)} degrés</li>
						</ul>
					</div>
				</div>

				<div className="mb-6">
					<Title>Déplacement et Vitesse des Segments Corporels</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Vitesse Moyenne: {velocityMean.toFixed(2)} unités/s</li>
						<li>Vitesse Maximale: {velocityMax.toFixed(2)} unités/s</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Symétrie du Mouvement de la Hanche</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Asymétrie Moyenne: {asymmetryMean.toFixed(2)} unités</li>
						<li>Asymétrie Maximale: {asymmetryMax.toFixed(2)} unités</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Conclusions</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>
							L'analyse des angles articulaires indique que le genou droit a une
							moyenne de {rightKneeAngleMean.toFixed(2)} degrés et le genou
							gauche a une moyenne de {leftKneeAngleMean.toFixed(2)} degrés.
						</li>
						<li>
							La vitesse des segments corporels montre une moyenne de{' '}
							{velocityMean.toFixed(2)} unités/s, avec un pic de{' '}
							{velocityMax.toFixed(2)} unités/s.
						</li>
						<li>
							La symétrie du mouvement de la hanche est généralement bonne, avec
							une moyenne d'asymétrie de {asymmetryMean.toFixed(2)} unités.
						</li>
					</ul>
				</div>
			</div>
			<div className="mb-6  md:w-full overflow-x-auto">
				<CustomPlot
					data={asymmetryJsonParsed.data}
					layout={asymmetryJsonParsed.layout}
				/>
			</div>
			<div className="mb-6  md:w-full overflow-x-auto">
				<CustomPlot
					data={hipMovementJsonParsed.data}
					layout={hipMovementJsonParsed.layout}
				/>
			</div>

			<div className="mb-6  md:w-full overflow-x-auto">
				<CustomPlot data={kneeJsonParsed.data} layout={kneeJsonParsed.layout} />
			</div>
			<div className="mb-6  md:w-full overflow-x-auto">
				<CustomPlot
					data={velocityJsonParsed.data}
					layout={velocityJsonParsed.layout}
				/>
			</div>
		</section>
	)
}
