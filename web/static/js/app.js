// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import Elm from './main';
const elmDiv = document.querySelector('#elm-target');
if (elmDiv) {
  	

	const TOKEN_KEY = 'token';
	const token = localStorage.getItem(TOKEN_KEY);
	const flags = {token: token};
	let app = Elm.Main.embed(elmDiv, flags);
	//let app = Elm.Main.fullScreen(flags);
	app.ports.saveToken.subscribe((token) => {
		localStorage.setItem(TOKEN_KEY, token);
	});

	app.ports.deleteToken.subscribe(() => {
		localStorage.removeItem(TOKEN_KEY);
	});
}

