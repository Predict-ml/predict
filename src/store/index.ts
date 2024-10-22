import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import appHeaderTitleSlice from './slices/appHeaderTitleSlice'
import appUsersSlice from './slices/appUsersSlice'
import athletesSlice from './slices/athletesSlice'
import counterSlice from './slices/counterSlice'
import predictRunSlice from './slices/predictRunSlice'
import storedAnalysesSlice from './slices/storedAnalisesSlice'
import user from './slices/userSlice'
import volleyballPredict from './slices/volleyballPredictSlice'

export const store = configureStore({
	reducer: {
		counterSlice,
		predictRunSlice,
		appHeaderTitleSlice,
		user,
		appUsers: appUsersSlice,
		athletes: athletesSlice,
		storedAnalyses: storedAnalysesSlice,
		volleyballPredict,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
