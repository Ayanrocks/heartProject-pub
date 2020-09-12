import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./scss/main.scss";
import * as serviceWorker from "./serviceWorker";
import configureStore from './store';
import {Provider} from "react-redux";

const store = configureStore();
const rocket = String.fromCodePoint(0x1F680)
const love = String.fromCodePoint(0x1F9E1)
const india = String.fromCodePoint(0x1F1EE, 0x1F1F3)
console.log(`${rocket} Coded with ${love} and passion`)
console.log(`${india} Made in India ${india}`)

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>, document.getElementById("root"));

serviceWorker.unregister();
// serviceWorker.register();
