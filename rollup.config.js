import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import path from "path";

const production = process.env.NODE_ENV === "production";

export default {
	input: path.resolve(__dirname, "client", "src", "main.js"),
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/build/bundle.js"
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			css: css => {
				css.write("bundle.css");
			}
		}),
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		commonjs(),
		// If we're building for production (npm run build)
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
