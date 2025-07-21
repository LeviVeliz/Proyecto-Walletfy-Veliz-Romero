import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light',
};

export const loadTheme = createAsyncThunk(
  'theme/loadTheme',
  async (): Promise<'light' | 'dark'> => {
    const savedTheme = localStorage.getItem('walletfy-theme') as 'light' | 'dark' | null;
    return savedTheme === 'dark' ? 'dark' : 'light';
  }
);

export const saveTheme = createAsyncThunk(
  'theme/saveTheme',
  async (theme: 'light' | 'dark') => {
    localStorage.setItem('walletfy-theme', theme);
    return theme;
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(saveTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      });
  },
});

export default themeSlice.reducer;