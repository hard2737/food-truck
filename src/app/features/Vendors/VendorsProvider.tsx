"use client"
import React from 'react'
import VendorList from './VendorList'
import VendorInputBar from './VendorInputBar'
import { Provider } from 'react-redux'
import store from '@/app/lib/store'

export default function VendorsProvider() {
  return (
    <Provider store={store}>
         <VendorInputBar />
         <VendorList /> 
    </Provider>
  )
}
