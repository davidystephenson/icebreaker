import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app'

import firebaseConfig from './firebaseConfig.json'
import App from './App'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const isLocal = window.location.hostname === 'localhost'
if (isLocal) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  // connectFunctionsEmulator(functions, 'localhost', 5001)
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
