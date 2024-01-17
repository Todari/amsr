import { configureStore } from '@reduxjs/toolkit'
import headerStateReducer from './headerStateReducer'
import screenSizeReducer from './screenSizeReducer'
import formDataReducer from './formDataReducer'
// ...

const store = configureStore({
  reducer: {
    headerState: headerStateReducer,
    screenSize: screenSizeReducer,
    FormData: formDataReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch