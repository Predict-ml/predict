import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface PredictRunStats {
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
	asymmetryJson: any
	hipMovementJson: any
	kneeAngleJson: any
	velocityJson: any
}

export interface predictData {
	outputFileUrl: string
	predict: PredictRunStats | any
}

const initialState: predictData = {
	outputFileUrl: '',
	predict: {} as PredictRunStats,
}

export const predictRunSlice = createSlice({
	name: 'predictRun',
	initialState,
	reducers: {
		startPredictData: (state, action: PayloadAction<predictData>) => {
			state.outputFileUrl = action.payload.outputFileUrl
			state.predict = action.payload.predict
		},
	},
})

// Action creators are generated for each case reducer function
export const { startPredictData } = predictRunSlice.actions

export default predictRunSlice.reducer
