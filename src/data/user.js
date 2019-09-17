import { db } from './firebase'

export const createUser = user => {
  db.collection('users')
    .doc(user.uid)
    .set({
      name: user.displayName,
      email: user.email,
    })
}
