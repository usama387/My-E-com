"use client";
import { persistor, store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: React.ReactNode;
}

// I will utilize this dummy layout and make this as client side application and the provider uses store for suer interaction by default and i passed in my store file from redux folder to connect it with layout.
const Layout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      {/* PersistGate is being utilized to stop data lost when browser reloads and i utilized persistor here written in store.js file of redux */}
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>{children}</SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
