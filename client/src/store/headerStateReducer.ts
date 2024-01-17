import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface HeaderState {
  showHeader: boolean
  // showSubMenuDropdown: boolean
}

const initialState: HeaderState = {
  showHeader: true,
  // showSubMenuDropdown: false
}

export const headerStateSlice = createSlice({
  name: 'headerState',
  initialState,
  reducers: {
    setShowHeader:( state, action: PayloadAction<boolean>) => {
      state.showHeader = action.payload
    },
    // setShowSubMenuDropdown: ( state, action: PayloadAction<boolean>) => {
    //   state.showSubMenuDropdown = action.payload
    // },
  }
})

export const {
  setShowHeader,
  // setShowSubMenuDropdown,
} = headerStateSlice.actions;

export const headerState = (state: RootState) => state.headerState

export default headerStateSlice.reducer