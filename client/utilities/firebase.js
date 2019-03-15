import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { config } from '../../secrets.js';

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
