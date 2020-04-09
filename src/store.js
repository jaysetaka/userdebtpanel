import {createStore, combineReducers, compose} from "redux";
import firebase from "firebase";
import "firebase/firestore";
import {reactReduxFirebase, firebaseReducer} from "react-redux-firebase";
import {reduxFirestore, firestoreReducer} from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducers";
import settingsReducer from "./reducers/settingsReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const firebaseConfig = {
  apiKey: "AIzaSyBcGBRVGUv_822uhhlpe6lGPZTAn9-PL10",
  authDomain: "panelclient-66060.firebaseapp.com",
  databaseURL: "https://panelclient-66060.firebaseio.com",
  projectId: "panelclient-66060",
  storageBucket: "panelclient-66060.appspot.com",
  messagingSenderId: "690238362173",
};

// React-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);
// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer,
});

// check for settings in local storage
if (localStorage.getItem("settings") === null) {
  // default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };

  // set to local storage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// create initial state
const initialState = {settings: JSON.parse(localStorage.getItem("settings"))};

// create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composeWithDevTools(reactReduxFirebase(firebase))
);

export default store;
