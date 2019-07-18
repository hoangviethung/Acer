import {
	series,
	parallel
} from "gulp";

// Import tasks
import server from "./_gulptasks/server";
import jsTask from "./_gulptasks/script";
import pugTask from "./_gulptasks/html";
import sassTask from "./_gulptasks/css";
import jsCore from "./_gulptasks/core-js";
import cssCore from "./_gulptasks/core-css";
import {
	newSourceLess,
	newSourceScss,
	newSourceSass,
} from "./_gulptasks/new";
import {
	cleanDist,
	cleanComponents
} from "./_gulptasks/clean";
import {
	copyFonts,
	copyImage,
	copyFavicon
} from "./_gulptasks/copy";


exports.newScss = series(
	cleanComponents,
	newSourceScss,
)
exports.newSass = series(
	cleanComponents,
	newSourceSass,
)
exports.newLess = series(
	cleanComponents,
	newSourceLess,
)

exports.default = series(
	cleanDist,
	parallel(
		copyFavicon,
		copyImage,
		copyFonts,
	),
	parallel(
		jsCore,
		cssCore
	),
	sassTask,
	jsTask,
	pugTask,
	server,
)