import { createSlice } from '@reduxjs/toolkit';

const sliderPageSlice = createSlice({
  name: 'slider',
  initialState: {
    movie: null,
    logo_media: null,
    logo_text: '',
    additional_text: '',
    button_text: '',
    button_link: ''
  },
  reducers: {
    updateField(state, { payload }) {
      const { field, value } = payload;
      state[field] = value;
    },
  }
});

export const { updateField } = sliderPageSlice.actions;
export default sliderPageSlice.reducer;
