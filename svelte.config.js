// import adapterNode from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import UnpluginIcons from 'unplugin-icons/vite'

// const scss = preprocess

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// * an array of file extensions that should be treated as Svelte components
	// extensions: [
	// 	// ".css",
	// 	'.svelte',
	// ],
	
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		
		preprocess({
			postcss: true,
    }),
		
		// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
		// scss({
		// 	includePaths: [
		// 		// "node_modules",
		// 		"src",
		// 	],
		// 	// faster for dart sass, but am I using the dart version?
		// 	// I'm using 'sass' a pure JS port of dart sass pkg, 
		// 	// so is the boost valid?
		// 	renderSync: true,
		// }),
		
	],
	
	kit: {
		// ssr: false,
		
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		// target: "", // targets document.body
		
		vite: {
      plugins: [
				
        UnpluginIcons({
					// autoInstall: true, // ? experimental -> doesn't work
          compiler: 'svelte',
        }),
				
      ],
			
    },
		
		
	},
	
};

export default config;
