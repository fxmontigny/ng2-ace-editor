import { Directive, EventEmitter, Output, ElementRef, Input } from "@angular/core";
import "brace";
import "brace/theme/monokai";
import "brace/mode/html";
var AceEditorDirective = (function () {
    function AceEditorDirective(elementRef) {
        this.textChanged = new EventEmitter();
        this.textChange = new EventEmitter();
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
        this.editor.on('change', function () { return _this.updateText(); });
        this.editor.on('paste', function () { return _this.updateText(); });
    };
    AceEditorDirective.prototype.updateText = function () {
        var newVal = this.editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
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
        { type: Directive, args: [{
                    selector: '[ace-editor]'
                },] },
    ];
    /** @nocollapse */
    AceEditorDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AceEditorDirective.propDecorators = {
        "textChanged": [{ type: Output },],
        "textChange": [{ type: Output },],
        "options": [{ type: Input },],
        "readOnly": [{ type: Input },],
        "theme": [{ type: Input },],
        "mode": [{ type: Input },],
        "text": [{ type: Input },],
        "autoUpdateContent": [{ type: Input },],
        "durationBeforeCallback": [{ type: Input },],
    };
    return AceEditorDirective;
}());
export { AceEditorDirective };
//# sourceMappingURL=directive.js.map