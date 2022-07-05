import * as admin from 'firebase-admin'

export default async function upsert ({
  ref, data = {}, debug
}: {
  ref: admin.firestore.DocumentReference
  data: admin.firestore.DocumentData
  debug?: boolean
}): Promise<admin.firestore.WriteResult> {
  if (debug === true) {
    console.log('ref test:', ref)
    console.log('data test:', data)
  }
  const time = admin.firestore.FieldValue.serverTimestamp()

  const update = { updatedAt: time }
  const updated = { ...data, ...update }

  const snapshot = await ref.get()

  if (snapshot.exists) {
    return await ref.update(updated)
  } else {
    const create = { createdAt: time }
    const created = {
      ...updated,
      ...create
    }

    console.log('created test:', created)

    return await ref.set(created)
  }
}
