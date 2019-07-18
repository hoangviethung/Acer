import {
	appendFile,
	writeFile,
	mkdir
} from "graceful-fs";

const createComponents = () => {
	mkdir("src/components", (err) => {
		if (err) throw err;
	});
	mkdir("src/components/_global", (err) => {
		if (err) throw err;
	});
	mkdir("src/components/_core", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/header.pug", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/footer.pug", "", (err) => {
		if (err) throw err;
	});
}


export const newSourceSass = (cb) => {
	createComponents()
	appendFile("src/components/main.sass", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/header.sass", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/footer.sass", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_core/variables.sass", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_core/core.sass", "", (err) => {
		if (err) throw err;
	});
	writeFile("gulp.json", "{\"config\":{\"css-generator\": \"sass\"}}", (err) => {
		if (err) throw err
	})
	writeFile("src/components/main.sass", "@import \"_core/variables.sass\"\n@import \"_core/core.sass\"\n@import \"_global/header.sass\"\n@import \"_global/footer.sass\"", (err) => {
		if (err) throw err
	})
	cb()
}

export const newSourceLess = (cb) => {
	createComponents()
	appendFile("src/components/main.less", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/header.less", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/footer.less", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_core/variables.less", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_core/core.less", "", (err) => {
		if (err) throw err;
	});
	writeFile("gulp.json", "{\"config\":{\"css-generator\": \"less\"}}", (err) => {
		if (err) throw err
	})
	writeFile("src/components/main.less", "@import \"_core/variables.less\"\;\n@import \"_core/core.less\"\;\n@import \"_global/header.less\"\;\n@import \"_global/footer.less\"\;", (err) => {
		if (err) throw err
	})
	cb();
}

export const newSourceScss = (cb) => {
	createComponents()
	appendFile("src/components/main.scss", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/header.scss", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_global/footer.scss", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_core/variables.scss", "", (err) => {
		if (err) throw err;
	});
	appendFile("src/components/_core/core.scss", "", (err) => {
		if (err) throw err;
	});
	writeFile("gulp.json", "{\"config\":{\"css-generator\": \"scss\"}}", (err) => {
		if (err) throw err
	})
	writeFile("src/components/main.scss", "@import \"_core/variables.scss\"\;\n@import \"_core/core.scss\"\;\n@import \"_global/header.scss\"\;\n@import \"_global/footer.scss\"\;", (err) => {
		if (err) throw err
	})
	cb();
}

module.exports = {
	newSourceScss,
	newSourceSass,
	newSourceLess
}