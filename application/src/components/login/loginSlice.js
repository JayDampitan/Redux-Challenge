// import { LOGIN, LOGOUT } from '../actions/types';
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { SERVER_IP } from '../../private';

const INITIAL_STATE = { email: "", token: "" };

// const doFetchById = async (userId,thunkAPI) => {
//     const response = await userAPI.fetchUserById(userId)
//     return response.data
// }
export const logIn = createAsyncThunk(
    'auth/logInStatus',
    doLogIn
);

const doLogIn = async(email, password) => {
    
    try {
        const fetchResponse = await fetch(`${SERVER_IP}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        if(fetchResponse.success) 
        return ({
            email: fetchResponse.email,
            token: fetchResponse.token
        })
        else 
        return {...INITIAL_STATE}
    } catch (error) {
        console.error(error);
        return {...INITIAL_STATE}
    }
    
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state, action) => {
            state = {...INITIAL_STATE}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            // state.email = action.payload.email;
            // state.token = action.payload.token
            state = {...action.payload}
        })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;




// export default (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case LOGIN:
//             return { ...state, email: action.payload.login, token: action.payload.token }
//         case LOGOUT:
//             return { ...state, ...INITIAL_STATE }
//         default:
//             return state;
//     }
// }