import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';



// export default defineConfig({
// 	plugins: [sveltekit()]
// });

export default defineConfig(({ mode }) => {
    let plugins = [sveltekit()];
    if (mode === 'development') {
        plugins = [nodeLoaderPlugin(), ...plugins];
    }

    return {
        // ... your code ...
        plugins
    };
});