import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import yeast from 'yeast'

admin.initializeApp()
const db = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

function createId (): string {
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

export const onCreateUser = functions.region('europe-west1').auth.user().onCreate(async (user) => {
  const displayName = user.displayName ?? createId()
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

export const onDeleteUser = functions.region('europe-west1').auth.user().onDelete(async (user) => {
  await db.collection('users').doc(user.uid).delete()
})

export const createGame = functions.region('europe-west1').https.onCall(async (data, context) => {
  console.log('context.app test:', context.app)
  if (context.app === undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    )
  }
  const id = createId()
  const now = admin.firestore.FieldValue.serverTimestamp()
  const doc = { name: id, creatorId: context.auth?.uid, createdAt: now, updatedAt: now }
  const ref = db.collection('games').doc(id)
  await ref.set(doc)
  functions.logger.info('Game created!!')
})
