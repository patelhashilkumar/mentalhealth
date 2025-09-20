import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-639994847-66f7a',
  appId: '1:970501567033:web:5a096bf7375d82713753e8',
  apiKey: 'AIzaSyBIvHo7Y4dGD6gpt0MSTB2zC4VjBpnwoUQ',
  authDomain: 'studio-639994847-66f7a.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '970501567033',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
