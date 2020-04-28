import dotenv from "dotenv";
import * as React from "react";
import { render } from "react-dom";
import App from "./App";

dotenv.config();

const rootElement = document.getElementById("root");
render(<App />, rootElement);

