(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('brace'), require('brace/theme/monokai'), require('brace/mode/html'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'brace', 'brace/theme/monokai', 'brace/mode/html', '@angular/forms'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.ng2aceeditor = {}),global.ng.core,null,null,null,global.ng.forms));
}(this, (function (exports,core,brace,monokai,html,forms) { 'use strict';

var AceEditorDirective = /** @class */ (function () {
    function AceEditorDirective(elementRef) {
        this.textChanged = new core.EventEmitter();
        this.textChange = new core.EventEmitter();
        this._options = {};
        this._readOnly = false;
        this._theme = "monokai";
        this._mode = "html";
        this._autoUpdateContent = true;
        this._durationBeforeCallback = 0;
        this._text = "";
        var el = elementRef.nativeElement;
        this.editor = ace["edit"](el);
        this.editor.$blockScrolling = Infinity;
    }
    AceEditorDirective.prototype.ngOnInit = function () {
        this.init();
        this.initEvents();
    };
    AceEditorDirective.prototype.init = function () {
        this.editor.setOptions(this._options || {});
        this.editor.setTheme("ace/theme/" + this._theme);
        this.setMode(this._mode);
        this.editor.setReadOnly(this._readOnly);
    };
    AceEditorDirective.prototype.initEvents = function () {
        var _this = this;
        var me = this;
        me.editor.on('change', function () { return _this.updateText(); });
        me.editor.on('paste', function () { return _this.updateText(); });
    };
    AceEditorDirective.prototype.updateText = function () {
        var newVal = this.editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
        if (typeof this.oldText !== 'undefined') {
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.textChange.emit(newVal);
                this.textChanged.emit(newVal);
            }
            else {
                if (this.timeoutSaving != null) {
                    clearTimeout(this.timeoutSaving);
                }
                this.timeoutSaving = setTimeout(function () {
                    that._text = newVal;
                    that.textChange.emit(newVal);
                    that.textChanged.emit(newVal);
                    that.timeoutSaving = null;
                }, this._durationBeforeCallback);
            }
        }
        this.oldText = newVal;
    };
    Object.defineProperty(AceEditorDirective.prototype, "options", {
        set: function (options) {
            this._options = options;
            this.editor.setOptions(options || {});
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "readOnly", {
        set: function (readOnly) {
            this._readOnly = readOnly;
            this.editor.setReadOnly(readOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "theme", {
        set: function (theme) {
            this._theme = theme;
            this.editor.setTheme("ace/theme/" + theme);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "mode", {
        set: function (mode) {
            this.setMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorDirective.prototype.setMode = function (mode) {
        this._mode = mode;
        if (typeof this._mode === 'object') {
            this.editor.getSession().setMode(this._mode);
        }
        else {
            this.editor.getSession().setMode("ace/mode/" + this._mode);
        }
    };
    Object.defineProperty(AceEditorDirective.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this.setText(text);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorDirective.prototype.setText = function (text) {
        if (this._text !== text) {
            if (text === null || text === undefined) {
                text = "";
            }
            if (this._autoUpdateContent === true) {
                this._text = text;
                this.editor.setValue(text);
                this.editor.clearSelection();
            }
        }
    };
    Object.defineProperty(AceEditorDirective.prototype, "autoUpdateContent", {
        set: function (status) {
            this._autoUpdateContent = status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AceEditorDirective.prototype, "durationBeforeCallback", {
        set: function (num) {
            this.setDurationBeforeCallback(num);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorDirective.prototype.setDurationBeforeCallback = function (num) {
        this._durationBeforeCallback = num;
    };
    Object.defineProperty(AceEditorDirective.prototype, "aceEditor", {
        get: function () {
            return this.editor;
        },
        enumerable: true,
        configurable: true
    });
    AceEditorDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ace-editor]'
                },] },
    ];
    /** @nocollapse */
    AceEditorDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    AceEditorDirective.propDecorators = {
        'textChanged': [{ type: core.Output },],
        'textChange': [{ type: core.Output },],
        'options': [{ type: core.Input },],
        'readOnly': [{ type: core.Input },],
        'theme': [{ type: core.Input },],
        'mode': [{ type: core.Input },],
        'text': [{ type: core.Input },],
        'autoUpdateContent': [{ type: core.Input },],
        'durationBeforeCallback': [{ type: core.Input },],
    };
    return AceEditorDirective;
}());

var AceEditorComponent = /** @class */ (function () {
    function AceEditorComponent(elementRef) {
        this.textChanged = new core.EventEmitter();
        this.textChange = new core.EventEmitter();
        this.style = {};
        this._options = {};
        this._readOnly = false;
        this._theme = "monokai";
        this._mode = "html";
        this._autoUpdateContent = true;
        this._durationBeforeCallback = 0;
        this._text = "";
        this._onChange = function (_) {
        };
        this._onTouched = function () {
        };
        var el = elementRef.nativeElement;
        this._editor = ace["edit"](el);
        this._editor.$blockScrolling = Infinity;
    }
    AceEditorComponent.prototype.ngOnInit = function () {
        this.init();
        this.initEvents();
    };
    AceEditorComponent.prototype.init = function () {
        this.setOptions(this._options || {});
        this.setTheme(this._theme);
        this.setMode(this._mode);
        this.setReadOnly(this._readOnly);
    };
    AceEditorComponent.prototype.initEvents = function () {
        var _this = this;
        this._editor.on('change', function () { return _this.updateText(); });
        this._editor.on('paste', function () { return _this.updateText(); });
    };
    AceEditorComponent.prototype.updateText = function () {
        var newVal = this._editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
        if (typeof this.oldText !== 'undefined') {
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.textChange.emit(newVal);
                this.textChanged.emit(newVal);
                this._onChange(newVal);
            }
            else {
                if (this.timeoutSaving) {
                    clearTimeout(this.timeoutSaving);
                }
                this.timeoutSaving = setTimeout(function () {
                    that._text = newVal;
                    that.textChange.emit(newVal);
                    that.textChanged.emit(newVal);
                    that.timeoutSaving = null;
                }, this._durationBeforeCallback);
            }
        }
        this.oldText = newVal;
    };
    Object.defineProperty(AceEditorComponent.prototype, "options", {
        set: function (options) {
            this.setOptions(options);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setOptions = function (options) {
        this._options = options;
        this._editor.setOptions(options || {});
    };
    Object.defineProperty(AceEditorComponent.prototype, "readOnly", {
        set: function (readOnly) {
            this.setReadOnly(readOnly);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setReadOnly = function (readOnly) {
        this._readOnly = readOnly;
        this._editor.setReadOnly(readOnly);
    };
    Object.defineProperty(AceEditorComponent.prototype, "theme", {
        set: function (theme) {
            this.setTheme(theme);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setTheme = function (theme) {
        this._theme = theme;
        this._editor.setTheme("ace/theme/" + theme);
    };
    Object.defineProperty(AceEditorComponent.prototype, "mode", {
        set: function (mode) {
            this.setMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setMode = function (mode) {
        this._mode = mode;
        if (typeof this._mode === 'object') {
            this._editor.getSession().setMode(this._mode);
        }
        else {
            this._editor.getSession().setMode("ace/mode/" + this._mode);
        }
    };
    Object.defineProperty(AceEditorComponent.prototype, "value", {
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.setText(value);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.writeValue = function (value) {
        this.setText(value);
    };
    AceEditorComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    AceEditorComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    Object.defineProperty(AceEditorComponent.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this.setText(text);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setText = function (text) {
        if (text === null || text === undefined) {
            text = "";
        }
        if (this._text !== text && this._autoUpdateContent === true) {
            this._text = text;
            this._editor.setValue(text);
            this._onChange(text);
            this._editor.clearSelection();
        }
    };
    Object.defineProperty(AceEditorComponent.prototype, "autoUpdateContent", {
        set: function (status) {
            this.setAutoUpdateContent(status);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setAutoUpdateContent = function (status) {
        this._autoUpdateContent = status;
    };
    Object.defineProperty(AceEditorComponent.prototype, "durationBeforeCallback", {
        set: function (num) {
            this.setDurationBeforeCallback(num);
        },
        enumerable: true,
        configurable: true
    });
    AceEditorComponent.prototype.setDurationBeforeCallback = function (num) {
        this._durationBeforeCallback = num;
    };
    AceEditorComponent.prototype.getEditor = function () {
        return this._editor;
    };
    AceEditorComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ace-editor',
                    template: '',
                    styles: [':host { display:block;width:100%; }'],
                    providers: [{
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return AceEditorComponent; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    AceEditorComponent.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    AceEditorComponent.propDecorators = {
        'textChanged': [{ type: core.Output },],
        'textChange': [{ type: core.Output },],
        'style': [{ type: core.Input },],
        'options': [{ type: core.Input },],
        'readOnly': [{ type: core.Input },],
        'theme': [{ type: core.Input },],
        'mode': [{ type: core.Input },],
        'value': [{ type: core.Input },],
        'text': [{ type: core.Input },],
        'autoUpdateContent': [{ type: core.Input },],
        'durationBeforeCallback': [{ type: core.Input },],
    };
    return AceEditorComponent;
}());

var AceEditorModule = /** @class */ (function () {
    function AceEditorModule() {
    }
    AceEditorModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        AceEditorComponent,
                        AceEditorDirective
                    ],
                    imports: [],
                    providers: [],
                    exports: [
                        AceEditorComponent,
                        AceEditorDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    AceEditorModule.ctorParameters = function () { return []; };
    return AceEditorModule;
}());

exports.AceEditorDirective = AceEditorDirective;
exports.AceEditorComponent = AceEditorComponent;
exports.AceEditorModule = AceEditorModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
