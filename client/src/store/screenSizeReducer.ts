import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface ScreenSize {
  width: number
  height: number
}

const initialState: ScreenSize = {
  width: window.screen.width,
  height: window.screen.height
}

export const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    setScreenSize: (state, action: PayloadAction<ScreenSize>) => {
      state.width = action.payload.width
      state.height = action.payload.height
    },
  }
})

export const { setScreenSize } = screenSizeSlice.actions;
// export const selectCount = (state: RootState) => state.screenSize

export default screenSizeSlice.reducer