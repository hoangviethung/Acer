import {
	src,
	dest
} from "gulp";
import sass from "gulp-sass";
import less from "gulp-less";
import rename from "gulp-rename";
import concat from "gulp-concat";
import sourcemap from "gulp-sourcemaps";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import cssSort from "css-declaration-sorter";
import autoprefixer from "autoprefixer";
import {
	readFileSync
} from "graceful-fs";

const glob = JSON.parse(readFileSync("gulp.json"));
const cssGenerator = glob.config["css-generator"];

let cssTaskOption = {};
cssTaskOption["sass"] = {
	path: "src/components/main.sass",
};
cssTaskOption["scss"] = {
	path: "src/components/main.scss",
};
cssTaskOption["less"] = {
	path: "src/components/main.less",
};

export const cssTask = () => {
	if (cssGenerator == "sass") {
		return src([
				"src/components/_core/**.sass",
				"src/components/_global/**.sass",
				"src/components/**/**.sass"
			])
			.pipe(sourcemap.init())
			.pipe(concat("main.sass"))
			.pipe(sass())
			.pipe(postcss([
				autoprefixer({
					browsers: ["last 4 version", "IE 9"],
					cascade: false
				}),
				cssnano(),
				cssSort({
					order: "concentric-css",
				})
			]))
			.pipe(rename({
				suffix: ".min"
			}))
			.pipe(sourcemap.write("."))
			.pipe(dest("dist/css"))
	} else if (cssGenerator == "scss") {
		return src([
				"src/components/_core/**.scss",
				"src/components/_global/**.scss",
				"src/components/**/**.scss"
			])
			.pipe(sourcemap.init())
			.pipe(concat("main.scss"))
			.pipe(sass())
			.pipe(postcss([
				autoprefixer({
					browsers: ["last 4 version", "IE 9"],
					cascade: false
				}),
				cssnano(),
				cssSort({
					order: "concentric-css",
				})
			]))
			.pipe(rename({
				suffix: ".min"
			}))
			.pipe(sourcemap.write("."))
			.pipe(dest("dist/css"))
	} else if (cssGenerator == "less") {
		return src([
				"src/components/_core/**.less",
				"src/components/_global/**.less",
				"src/components/**/**.less"
			])
			.pipe(sourcemap.init())
			.pipe(concat("main.less"))
			.pipe(less())
			.pipe(postcss([
				autoprefixer({
					browsers: ["last 4 version", "IE 9"],
					cascade: false
				}),
				cssnano(),
				cssSort({
					order: "concentric-css",
				})
			]))
			.pipe(rename({
				suffix: ".min"
			}))
			.pipe(sourcemap.write("."))
			.pipe(dest("dist/css"))
	}
};

module.exports = cssTask;