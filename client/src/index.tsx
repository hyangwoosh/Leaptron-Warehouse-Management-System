import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/main.scss";
import { SocketContext, socket } from "./context/socket";

const container = document.getElementById("root")!;
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketContext.Provider value={socket}>
        <Router>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Router>
      </SocketContext.Provider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
