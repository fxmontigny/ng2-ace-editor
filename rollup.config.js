import angular from 'rollup-plugin-angular';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'dist/index.js',
    output: {
        file: 'dist/bundles/ng2-ace-editor.umd.js',
        format: 'umd'
    },
    sourceMap: false,
    name: 'ng.ng2aceeditor',
    globals: {
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms'
    },
    external: [
        '@angular/core',
        '@angular/forms',
        'brace',
        'brace/theme/monokai',
        'brace/mode/html'
    ],
    plugins: [
        angular(),
        typescript()
    ]
}
