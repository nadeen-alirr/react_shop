import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import HomeScreen from "./screens/HomeScreen";
import ProuductScreen from "./screens/ProuductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import Register from "./screens/Register";
import Shipping from "./screens/Shipping";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    // App must be logged in (authentecation required)
    <Route path="/" element={<App />}> 
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route  path="/products/:id" element={<ProuductScreen />} />
      <Route  path="/cart" element={<CartScreen />} />
      <Route  path="/login" element={<LoginScreen />} />
      <Route  path="/register" element={<Register />} />
      <Route  path="/shipping" element={<Shipping />} />
    </Route>
  )
);
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
</Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
