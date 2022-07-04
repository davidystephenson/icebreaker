import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import yeast from 'yeast'

admin.initializeApp()
const db = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

function createName (): string {
  const id = yeast()
  const array = [...id]
  const reversed = array.reverse()
  const name = reversed.join('')

  return name
}

export const hi = functions.region('europe-west1').https.onRequest((request, response) => {
  functions.logger.info('Hi!', { structuredData: true })
  response.send('Hi from Firebase!')
})

export const onCreate = functions.region('europe-west1').auth.user().onCreate(async (user) => {
  const displayName = user.displayName ?? createName()
  const doc = {
    email: user.email,
    displayName,
    photoURL: user.photoURL,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }
  const ref = db.collection('users').doc(user.uid)
  await ref.set(doc)
  functions.logger.info('User created!!')
})

export const createGame = functions.region('europe-west1').https.onCall(async (data, context) => {
  const name = createName()
  const now = admin.firestore.FieldValue.serverTimestamp()
  const doc = { name, createdAt: now, updatedAt: now }
  const ref = db.collection('games').doc()
  await ref.set(doc)
  functions.logger.info('Game created!!')
})
