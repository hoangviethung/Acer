import {
	src,
	dest
} from "gulp";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import plumber from "gulp-plumber";
import {
	readFileSync
} from "graceful-fs";

export const jsCore = () => {
	let glob = JSON.parse(readFileSync("_vendor.json"));
	let jsVendorList = glob.vendor.js;
	return src(jsVendorList, {
			allowEmpty: true
		})
		.pipe(plumber())
		.pipe(concat("core.min.js"))
		.pipe(uglify())
		.pipe(dest("dist/js"))
};

module.exports = jsCore;