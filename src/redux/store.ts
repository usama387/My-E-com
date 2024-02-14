import { configureStore } from "@reduxjs/toolkit";
import orebiReducer from "./orebiSlice";
// implementing the functionality store doesn't lose its current state when the browser reloads and here are all the imported packages which help manage memory of application
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  WebStorage,
} from "redux-persist";
// Being utilized in dummy server
import createWebStorage from "redux-persist/es/storage/createWebStorage";


//  to inject react-persist we need to create a dummy server in NextJs
export function createPersistStore(): WebStorage {
  // dummy server
  const isServer = typeof window === "undefined";

  //returning dummy server
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

// once i have the server let's create the storage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, orebiReducer);

// here pass all the reducers created in orebi slice file
export const store = configureStore({
  reducer: {
    orebi: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
