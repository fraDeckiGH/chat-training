const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssFocus = require("postcss-focus");


const mode = process.env.NODE_ENV;
const dev = mode === "development";

const config = {
	plugins: [
		!dev && autoprefixer(),
		
		!dev && cssnano({
			preset: "default",
		}),
		
		// * aka "postcss-fail-on-warn"
		// https://github.com/postcss/postcss#treat-warnings-as-errors
		// ? to be sure, leave this at the end after the other plugins
		postcssFocus,
		
		// * might need
		
		// parsing(transforming) styles in <style> tags of HTML-like files
		// https://github.com/gucong3000/postcss-html
		
		// apply PostCSS transformations to .scss files
		// https://github.com/postcss/postcss-scss
		
	],
};

module.exports = config;
