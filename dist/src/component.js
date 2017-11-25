import { Component, EventEmitter, Output, ElementRef, Input, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import "brace";
import "brace/theme/monokai";
import "brace/mode/html";
var AceEditorComponent = (function () {
    function AceEditorComponent(elementRef) {
        this.textChanged = new EventEmitter();
        this.textChange = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'ace-editor',
                    template: '',
                    styles: [':host { display:block;width:100%; }'],
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return AceEditorComponent; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    AceEditorComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AceEditorComponent.propDecorators = {
        "textChanged": [{ type: Output },],
        "textChange": [{ type: Output },],
        "style": [{ type: Input },],
        "options": [{ type: Input },],
        "readOnly": [{ type: Input },],
        "theme": [{ type: Input },],
        "mode": [{ type: Input },],
        "value": [{ type: Input },],
        "text": [{ type: Input },],
        "autoUpdateContent": [{ type: Input },],
        "durationBeforeCallback": [{ type: Input },],
    };
    return AceEditorComponent;
}());
export { AceEditorComponent };
//# sourceMappingURL=component.js.map