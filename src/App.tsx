import { ChakraProvider, Container, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import Router from './Router'
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebaseConfig.json'
import appCheck from './appCheck.json'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

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

function App (): JSX.Element {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Container>
          <Heading>
            <Link to='/'>Icebreaker</Link>
          </Heading>

          <Router />
        </Container>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App
