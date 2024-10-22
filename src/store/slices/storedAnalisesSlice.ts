import { AthleteWithPredictionCount } from '@/services/predictStoraged/predictStoraged'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface Prediction {
	id: number
	subCategory: string
	createdAt: string
}

interface AthleteWithPredictions {
	name: string
	Prediction: Prediction[]
}

export interface WalkAnalysis {
	id: number
	predictionId: number
	nome: string
	rightKneeAngleMean: number
	rightKneeAngleMin: number
	rightKneeAngleMax: number
	leftKneeAngleMean: number
	leftKneeAngleMin: number
	leftKneeAngleMax: number
	velocityMean: number
	velocityMax: number
	asymmetryMean: number
	asymmetryMax: number
	kneeAngleJson: string
	velocityJson: string
	hipMovementJson: string
	asymmetryJson: string
	outputVideo: string
}

export interface StoredAnalyses {
	athletes: AthleteWithPredictionCount[]
	walkAnalysis: WalkAnalysis | null
	predictions: AthleteWithPredictions | null
	loading: boolean
	currentAnalysis: 'walk' | 'block' | null

	blockAnalysis: any | null
}

const initialState: StoredAnalyses = {
	athletes: [],
	walkAnalysis: null,
	predictions: null,
	loading: false,
	currentAnalysis: null,
	blockAnalysis: null,
}

export const storedAnalysesSlice = createSlice({
	name: 'storedAnalyses',
	initialState,
	reducers: {
		setAthletes: (
			state,
			action: PayloadAction<AthleteWithPredictionCount[]>,
		) => {
			state.athletes = action.payload
		},
		setWalkAnalysis: (state, action: PayloadAction<WalkAnalysis>) => {
			state.walkAnalysis = action.payload
		},
		setPredictions: (state, action: PayloadAction<AthleteWithPredictions>) => {
			state.predictions = action.payload
		},
		clearStoredData: (state) => {
			state.athletes = []
			state.walkAnalysis = null
			state.predictions = null
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setCurrentAnalysis: (
			state,
			action: PayloadAction<'walk' | 'block' | null>,
		) => {
			state.currentAnalysis = action.payload
		},
		setBlockAnalysis: (state, action: PayloadAction<any>) => {
			state.blockAnalysis = action.payload
		},
	},
})

export const {
	setAthletes,
	setWalkAnalysis,
	setPredictions,
	clearStoredData,
	setLoading,
	setCurrentAnalysis,
	setBlockAnalysis,
} = storedAnalysesSlice.actions

export default storedAnalysesSlice.reducer
