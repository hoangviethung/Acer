import del from "del";

export const cleanDist = () => {
	return del("dist")
}

export const cleanImage = () => {
	return del("dist/img")
}

export const cleanComponents = () => {
	return del("src/components/**")
}

module.exports = {
	cleanDist,
	cleanImage,
	cleanComponents
};