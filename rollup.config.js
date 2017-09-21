export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng2-ace-editor.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.ng2aceeditor',
    globals: {
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms'
    }
}
