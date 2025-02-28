import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../packages/store";
import { RouterProvider } from "react-router-dom";
import router from "../packages/router";
import "../packages/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <div>
    <div>
      <RouterProvider router={router} />
    </div>
  </div>
</Provider>
);
