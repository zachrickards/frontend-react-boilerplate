# Front-End React App Boilerplate

I created this to knock out some of the complexity of other boilerplates. Any updates that you as a consumer may find dersireable, feel free to create issues / pull requests. Some features are listed below.

## Features
* Defaults w/ React, Axios, React-Bootstrap, React-Dom
* Includes Jest w/ presets
* Includes eslinting w/ presets as well
* Package.json Scripts
	1. watch-css - builds less files and watches for changes by using `node-less-chokidar` <https://www.npmjs.com/package/node-less-chokidar>
	2. build-css - builds less files which can be used during the webpack build step
	3. dev - concurrently runs watch-css and webpack-dev-server by using `concurrently`<https://www.npmjs.com/package/concurrently>
* Webpack is set up to be optimized for both developement and production
