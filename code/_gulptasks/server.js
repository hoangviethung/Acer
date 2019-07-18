import {
	watch,
	series,
	parallel
} from "gulp"
import bSync from "browser-sync";
import jsCore from "./core-js"
import jsTask from "./script"
import pugTask from "./html"
import cssCore from "./core-css"
import cssTask from "./css"
import {
	copyImage
} from "./copy";
import {
	cleanImage
} from "./clean";

export const server = () => {
	bSync.init({
		notify: false,
		server: {
			baseDir: "dist",
		},
		port: 8000
	})

	watch([
		"src/js/*.js"
	], series(jsTask));

	watch([
		"src/**/**.pug"
	], series(pugTask));

	watch([
		"src/components/**/**.{less,scss,sass}"
	], series(cssTask));

	watch([
		"src/img/**/**.{svg,png,jpg,speg,gif}"
	], series(cleanImage, copyImage));

	watch([
		"_vendor/**/**.css", "_vendor/**/**.js", "_vendor.json"
	], parallel(jsCore, cssCore));

	watch([
		"dist"
	]).on("change", bSync.reload);
}

module.exports = server;