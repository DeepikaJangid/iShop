'use client'

import React from 'react'
import { Provider } from "react-redux";
import store from '@/redux/store/store';

export default function ReduxProvider(props) {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}