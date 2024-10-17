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
		right_knee_angle_mean = 0,
		right_knee_angle_min = 0,
		right_knee_angle_max = 0,
		left_knee_angle_mean = 0,
		left_knee_angle_min = 0,
		left_knee_angle_max = 0,
		velocity_mean = 0,
		velocity_max = 0,
		asymmetry_mean = 0,
		asymmetry_max = 0,
		asymmetry_json,
		hip_movement_json,
		knee_angle_json,
		velocity_json,
	} = predict

	const asymetryJsonParsed = JSON.parse(asymmetry_json)
	const hipmovementJsonParsed = JSON.parse(hip_movement_json)
	const kneeJsonParsed = JSON.parse(knee_angle_json)
	const velJsonParsed = JSON.parse(velocity_json)

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
			className="w-full  mx-auto bg-white max-w-6xl flex flex-col items-center
		"
		>
			<div className="p-8 ">
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
							<li>Angle Minimum: {right_knee_angle_min.toFixed(2)} degrés</li>
							<li>Angle Moyen: {right_knee_angle_mean.toFixed(2)} degrés</li>
							<li>Angle Maximum: {right_knee_angle_max.toFixed(2)} degrés</li>
						</ul>
					</div>
					<div>
						<strong className="block mb-2">Angle du Genou Gauche</strong>
						<ul className="list-disc ml-5 text-lg text-gray-600">
							<li>Angle Minimum: {left_knee_angle_min.toFixed(2)} degrés</li>
							<li>Angle Moyen: {left_knee_angle_mean.toFixed(2)} degrés</li>
							<li>Angle Maximum: {left_knee_angle_max.toFixed(2)} degrés</li>
						</ul>
					</div>
				</div>

				<div className="mb-6">
					<Title>Déplacement et Vitesse des Segments Corporels</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Vitesse Moyenne: {velocity_mean.toFixed(2)} unités/s</li>
						<li>Vitesse Maximale: {velocity_max.toFixed(2)} unités/s</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Symétrie du Mouvement de la Hanche</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Asymétrie Moyenne: {asymmetry_mean.toFixed(2)} unités</li>
						<li>Asymétrie Maximale: {asymmetry_max.toFixed(2)} unités</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Conclusions</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>
							L'analyse des angles articulaires indique que le genou droit a une
							moyenne de {right_knee_angle_mean.toFixed(2)} degrés et le genou
							gauche a une moyenne de {left_knee_angle_mean.toFixed(2)} degrés.
						</li>
						<li>
							La vitesse des segments corporels montre une moyenne de{' '}
							{velocity_mean.toFixed(2)} unités/s, avec un pic de{' '}
							{velocity_max.toFixed(2)} unités/s.
						</li>
						<li>
							La symétrie du mouvement de la hanche est généralement bonne, avec
							une moyenne d'asymétrie de {asymmetry_mean.toFixed(2)} unités.
						</li>
					</ul>
				</div>
			</div>
			<div className="mb-6 w-96 sm:w-[80%] md:w-full overflow-x-auto ">
				<CustomPlot
					data={asymetryJsonParsed.data}
					layout={asymetryJsonParsed.layout}
				/>
			</div>
			<div className="mb-6 w-full sm:w-[80%] md:w-full overflow-x-auto">
				<CustomPlot
					data={hipmovementJsonParsed.data}
					layout={hipmovementJsonParsed.layout}
				/>
			</div>

			<div className="mb-6 w-96 sm:w-[80%] md:w-full overflow-x-auto">
				<CustomPlot data={kneeJsonParsed.data} layout={kneeJsonParsed.layout} />
			</div>
			<div className="mb-6 w-96 sm:w-[80%] md:w-full overflow-x-auto">
				<CustomPlot data={velJsonParsed.data} layout={velJsonParsed.layout} />
			</div>
		</section>
	)
}
