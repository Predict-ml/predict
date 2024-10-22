import { PredictBlockReturn } from '@/services/volleyballPredictService/volleyballPredictService'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface VolleyballPredictState {
	predictBlock: PredictBlockReturn | null
	loading: boolean
	crrPredictType: 'block' | 'serve' | 'pass' | null
}

const initialState: VolleyballPredictState = {
	predictBlock: null,
	loading: false,
	crrPredictType: null,
}

const volleyballPredictSlice = createSlice({
	name: 'volleyballPredict',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setPredictBlock: (state, action: PayloadAction<PredictBlockReturn>) => {
			state.predictBlock = action.payload
		},
		clearPredictBlock: (state) => {
			state.predictBlock = null
		},
		setCrrPredictType: (
			state,
			action: PayloadAction<'block' | 'serve' | 'pass'>,
		) => {
			state.crrPredictType = action.payload
		},
	},
})

export const {
	setLoading,
	setPredictBlock,
	clearPredictBlock,
	setCrrPredictType,
} = volleyballPredictSlice.actions

export default volleyballPredictSlice.reducer
