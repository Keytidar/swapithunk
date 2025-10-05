import { useState } from 'react'
import './App.css'
import Swapi from './components/Swapi'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {

  return (
    <>
    <Provider store={store}>
        <Swapi />
    </Provider>
    </>
  )
}

export default App
