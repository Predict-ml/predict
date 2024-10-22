// components/PredictResults.tsx
import { CustomPlot } from '@/components/CustomPlot'
import { PredictBlockReturn } from '@/services/volleyballPredictService/volleyballPredictService'

interface PredictResultsProps {
	predictData: PredictBlockReturn
}

export const PredictResults = ({ predictData }: PredictResultsProps) => {
	const {
		predict,
		jumpHeightAnalysis,
		reactionTimeAndSpeedAnalysis,
		armAnglesAnalysis,
		bodySymmetryAnalysis,
	} = predictData

	return (
		<div className="w-full">
			{predict && (
				<CustomPlot
					data={predict.data}
					layout={predict.layout}
					frames={predict.frames}
					divH="h-[800px]"
					plotH="h-[800px]"
				/>
			)}

			{jumpHeightAnalysis && (
				<CustomPlot
					data={jumpHeightAnalysis.data}
					layout={jumpHeightAnalysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}

			{reactionTimeAndSpeedAnalysis && (
				<CustomPlot
					data={reactionTimeAndSpeedAnalysis.data}
					layout={reactionTimeAndSpeedAnalysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}

			{armAnglesAnalysis && (
				<CustomPlot
					data={armAnglesAnalysis.data}
					layout={armAnglesAnalysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}

			{bodySymmetryAnalysis && (
				<CustomPlot
					data={bodySymmetryAnalysis.data}
					layout={bodySymmetryAnalysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}
		</div>
	)
}
