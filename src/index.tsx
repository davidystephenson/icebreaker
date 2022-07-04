import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app'

import firebaseConfig from './firebaseConfig.json'
import App from './App'

initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
