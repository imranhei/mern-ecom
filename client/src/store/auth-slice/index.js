import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated : false,
    isLoading: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setIsAuthenticated, setIsLoading, setUser } = authSlice.actions;

export default authSlice.reducer;

