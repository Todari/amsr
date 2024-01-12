import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { CheckedState } from '@radix-ui/react-checkbox';
import STRING from '@/constants/String';

interface FormData {
  round: string;
  privacy: CheckedState | void;
  name: string;
  gender: boolean;
  phone: string;
  age: string;
  mbti: string;
  invited: string,
  changeSeat: boolean,
  bottles: number,
}

const initialState: FormData = {
  round: `${STRING.mainLandingTitlePrefix} ${STRING.mainLandingTitleSuffix}`,
  privacy: false,
  name: '',
  gender: true,
  phone: '',
  age: '',
  mbti: '',
  invited: '',
  changeSeat: true,
  bottles: 0,
}

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    // setFormData: (state, action: PayloadAction<FormData>) => {
      
    // },
    setPrivacy: (state, action: PayloadAction<boolean>) => {
      state.privacy = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setGender: (state, action: PayloadAction<boolean>) => {
      state.gender = action.payload
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setAge: (state, action: PayloadAction<string>) => {
      state.age = action.payload
    },
    setMbti: (state, action: PayloadAction<string>) => {
      state.mbti = action.payload
    },
    setInvited: (state, action: PayloadAction<string>) => {
      state.invited = action.payload
    },
    setChangeSeat: (state, action: PayloadAction<boolean>) => {
      state.changeSeat = action.payload
    },
    setBottles: (state, action: PayloadAction<number>) => {
      state.bottles = action.payload
    },
  }
})

export const {
  setPrivacy,
  setName,
  setGender,
  setPhone,
  setAge,
  setMbti,
  setInvited,
  setChangeSeat,
  setBottles
} = formDataSlice.actions;
export const formData = (state: RootState) => state.formData

export default formDataSlice.reducer