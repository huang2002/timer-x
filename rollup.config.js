import rollupPluginBabel from "rollup-plugin-babel";

const input = 'raw/index.js';

export default [
    {
        input,
        plugins: [
            rollupPluginBabel()
        ],
        output: {
            format: 'umd',
            name: 'TX',
            file: 'dist/timer-x.umd.js'
        }
    },
    {
        input,
        output: {
            format: 'esm',
            file: 'dist/timer-x.js'
        }
    }
];
