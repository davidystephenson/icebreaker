import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBqkpd18QBOIa3KOUEBXTP4Q4X4wcti-Rc',
  authDomain: 'an-icebreaker-game.firebaseapp.com',
  projectId: 'an-icebreaker-game',
  storageBucket: 'an-icebreaker-game.appspot.com',
  messagingSenderId: '489628822436',
  appId: '1:489628822436:web:6eb2871c594c6459662f31',
  measurementId: 'G-7FFLYQDS7W'
}
initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
