import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.database()
    this.store = app.storage()
  }

  // Auth API
  handleSignUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  handleLogin = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  handleSignOut = () => this.auth.signOut()

  // User API
  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref('users')

  // Storage API
  upload = (file, name, metadata) => this.store.ref().child(name).put(file, metadata)

}

export default Firebase