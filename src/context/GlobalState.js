import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
    TotalCovid: {
        confirmed: 0, deaths: 0, recovered: 0
    },
    Covid: [],
    loading: true,
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // action
    async function GetApiCovid() {
        try {
            const res = await axios("https://covid19.mathdro.id/api/")
            const point = await res.data;
            dispatch({
                type: 'GET_POSITIVE',
                payload: {
                    confirmed: point.confirmed.value,
                    deaths: point.deaths.value,
                    recovered: point.recovered.value
                },
            });
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err
            })
        }
    }

    async function GetData() {
        try {
            const res = await axios('https://covid19.mathdro.id/api/confirmed')
            const point = await res.data;
            dispatch({
                type: 'COVID',
                payload: point,
            });
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err
            })
        }
    }



    return (
        <GlobalContext.Provider
            value={{
                TotalCovid: state.TotalCovid,
                Covid: state.Covid,
                loading: state.loading,
                GetApiCovid,
                GetData
            }} >
            {children}

        </GlobalContext.Provider >
    )
}