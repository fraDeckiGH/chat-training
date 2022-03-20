// @ts-check

// import adapterNode from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import unpluginAutoImport from 'unplugin-auto-import/vite'
// import resolver_unpluginIcons from 'unplugin-icons/resolver'
// import unpluginIcons from 'unplugin-icons/vite'
import purgeIcons from 'vite-plugin-purge-icons'


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
				
				// unpluginAutoImport({
				// 	// ? 'auto-imports.d.ts' path
				// 	// dts: "",
				// 	imports: [
				// 		'svelte',
				// 		'svelte/animate',
				// 		'svelte/easing',
				// 		'svelte/motion',
				// 		'svelte/store',
				// 		'svelte/transition',
				// 	],
					
				// }),
				
				// * <Icon/> setup
				purgeIcons({
					// ? PurgeIcons options
				}),
				
				// * <Icon/> setup: unplugin-icons + unplugin-auto-import
				//#region 
				// unpluginAutoImport({
				// 	// ? 'auto-imports.d.ts' path
				// 	// dts: "",
					
				// 	resolvers: [
				// 		resolver_unpluginIcons({
				// 			// extension: 'jsx',
				// 			prefix: 'Icon',
							
				// 		})
				// 	],
				// }),
				
        // unpluginIcons({
				// 	// autoInstall: true, // ? experimental -> doesn't work
        //   compiler: 'svelte',
					
        // }),
				//#endregion 
				
      ],
    },
		
	},
};


export default config;
