import React from "react";
import ReactDOM from "react-dom";

import { ConfigProvider } from "antd";
import frFR from "antd/es/locale/fr_FR";

import { ApolloProvider } from "@apollo/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "antd/dist/antd.min.css";
import "react-calendar/dist/Calendar.css";
import "./styles/styles.css";
import "./styles/main.css";

import { client } from "./apollo";
import { HelmetProvider } from "react-helmet-async";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
// @ts-ignore
import localization from "moment/locale/fr";

moment.updateLocale("fr", localization);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider locale={frFR}>
        <HelmetProvider>
          <App />
          <ToastContainer />
        </HelmetProvider>
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
