import { FirebaseApp, initializeApp } from 'firebase/app'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, Functions, getFunctions } from 'firebase/functions'

import appCheck from '../appCheck.json'
import firebaseConfig from '../firebaseConfig.json'

import { contextCreator } from './creator'

interface FireValue {
  app: FirebaseApp
  db: Firestore
  functions: Functions
  auth: Auth
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const functions = getFunctions(app, 'europe-west1')
const auth = getAuth(app)

const isLocal = window.location.hostname === 'localhost'
console.log('isLocal test:', isLocal)

const token = isLocal ? appCheck.debug : appCheck.site
if (isLocal) {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  console.warn('Using debug token:', token)
}
const provider = new ReCaptchaV3Provider(token)
initializeAppCheck(app, { provider, isTokenAutoRefreshEnabled: true })
if (isLocal) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectFunctionsEmulator(functions, 'localhost', 5001)
  connectAuthEmulator(auth, 'http://localhost:9099')
}
const fire = { app, db, functions, auth }

function useFireValue (): FireValue {
  return fire
}

export const {
  useContext: useFireContext,
  Provider: FireProvider
} = contextCreator({
  useValue: useFireValue, initialValue: fire
})
