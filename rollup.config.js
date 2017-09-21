export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng2-ace-editor.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.ng2aceeditor',
    globals: {
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms',
        'rxjs/Observable': 'Rx',
        'rxjs/ReplaySubject': 'Rx',
        'rxjs/add/operator/map': 'Rx.Observable.prototype',
        'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
        'rxjs/add/observable/fromEvent': 'Rx.Observable',
        'rxjs/add/observable/of': 'Rx.Observable'
    }
}