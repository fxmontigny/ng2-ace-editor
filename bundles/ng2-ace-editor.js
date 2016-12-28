System.registerDynamic("src/directive", ["@angular/core", "brace", "brace/theme/monokai", "brace/mode/html"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    $__require("brace");
    $__require("brace/theme/monokai");
    $__require("brace/mode/html");
    var AceEditorDirective = function () {
        function AceEditorDirective(elementRef) {
            this.textChanged = new core_1.EventEmitter();
            this._options = {};
            this._readOnly = false;
            this._theme = "monokai";
            this._mode = "html";
            this._autoUpdateContent = true;
            var el = elementRef.nativeElement;
            this.editor = ace["edit"](el);
            this.init();
            this.initEvents();
        }
        AceEditorDirective.prototype.init = function () {
            this.editor.setOptions(this._options || {});
            this.editor.setTheme("ace/theme/" + this._theme);
            this.setMode(this._mode);
            this.editor.setReadOnly(this._readOnly);
        };
        AceEditorDirective.prototype.initEvents = function () {
            var _this = this;
            this.editor.on('change', function () {
                var newVal = _this.editor.getValue();
                if (newVal === _this.oldText) return;
                if (typeof _this.oldText !== 'undefined') _this.textChanged.emit(newVal);
                _this.oldText = newVal;
            });
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
            if (typeof this._mode == 'object') {
                this.editor.getSession().setMode(this._mode);
            } else {
                this.editor.getSession().setMode("ace/mode/" + this._mode);
            }
        };
        Object.defineProperty(AceEditorDirective.prototype, "text", {
            set: function (text) {
                if (text == null) text = "";
                if (this._autoUpdateContent == true) {
                    this.editor.setValue(text);
                    this.editor.clearSelection();
                    this.editor.focus();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditorDirective.prototype, "autoUpdateContent", {
            set: function (status) {
                this._autoUpdateContent = status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditorDirective.prototype, "aceEditor", {
            get: function () {
                return this.editor;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([core_1.Output('textChanged'), __metadata('design:type', Object)], AceEditorDirective.prototype, "textChanged", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorDirective.prototype, "options", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorDirective.prototype, "readOnly", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorDirective.prototype, "theme", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorDirective.prototype, "mode", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorDirective.prototype, "text", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorDirective.prototype, "autoUpdateContent", null);
        AceEditorDirective = __decorate([core_1.Directive({
            selector: '[ace-editor]'
        }), __metadata('design:paramtypes', [core_1.ElementRef])], AceEditorDirective);
        return AceEditorDirective;
    }();
    exports.AceEditorDirective = AceEditorDirective;
    return module.exports;
});
System.registerDynamic("src/component", ["@angular/core", "brace", "brace/theme/monokai", "brace/mode/html"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    $__require("brace");
    $__require("brace/theme/monokai");
    $__require("brace/mode/html");
    var AceEditorComponent = function () {
        function AceEditorComponent(elementRef) {
            this.textChanged = new core_1.EventEmitter();
            this.style = {};
            this._options = {};
            this._readOnly = false;
            this._theme = "monokai";
            this._mode = "html";
            this._autoUpdateContent = true;
            this._durationBeforeCallback = 0;
            var el = elementRef.nativeElement;
            this._editor = ace["edit"](el);
            this.init();
            this.initEvents();
        }
        AceEditorComponent.prototype.init = function () {
            this.setOptions(this._options || {});
            this.setTheme(this._theme);
            this.setMode(this._mode);
            this.setReadOnly(this._readOnly);
        };
        AceEditorComponent.prototype.initEvents = function () {
            var me = this;
            me._editor.on('change', function () {
                var newVal = me._editor.getValue();
                if (newVal === me.oldText) return;
                if (typeof me.oldText !== 'undefined') {
                    if (me._durationBeforeCallback == 0) me.textChanged.emit(newVal);else {
                        if (me.timeoutSaving != null) clearTimeout(me.timeoutSaving);
                        me.timeoutSaving = setTimeout(function () {
                            me.textChanged.emit(newVal);
                            me.timeoutSaving = null;
                        }, me._durationBeforeCallback);
                    }
                }
                me.oldText = newVal;
            });
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
            if (typeof this._mode == 'object') {
                this._editor.getSession().setMode(this._mode);
            } else {
                this._editor.getSession().setMode("ace/mode/" + this._mode);
            }
        };
        Object.defineProperty(AceEditorComponent.prototype, "text", {
            set: function (text) {
                this.setText(text);
            },
            enumerable: true,
            configurable: true
        });
        AceEditorComponent.prototype.setText = function (text) {
            if (text == null) text = "";
            if (this._autoUpdateContent == true) {
                this._editor.setValue(text);
                this._editor.clearSelection();
                this._editor.focus();
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
        __decorate([core_1.Output('textChanged'), __metadata('design:type', Object)], AceEditorComponent.prototype, "textChanged", void 0);
        __decorate([core_1.Input('style'), __metadata('design:type', Object)], AceEditorComponent.prototype, "style", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorComponent.prototype, "options", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorComponent.prototype, "readOnly", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorComponent.prototype, "theme", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorComponent.prototype, "mode", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorComponent.prototype, "text", null);
        __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], AceEditorComponent.prototype, "autoUpdateContent", null);
        __decorate([core_1.Input(), __metadata('design:type', Number), __metadata('design:paramtypes', [Number])], AceEditorComponent.prototype, "durationBeforeCallback", null);
        AceEditorComponent = __decorate([core_1.Component({
            selector: 'ace-editor',
            template: '',
            styles: [':host { display:block;width:100%; }']
        }), __metadata('design:paramtypes', [core_1.ElementRef])], AceEditorComponent);
        return AceEditorComponent;
    }();
    exports.AceEditorComponent = AceEditorComponent;
    return module.exports;
});
System.registerDynamic('ng2-ace-editor', ['./src/directive', './src/component'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var directive_1 = $__require('./src/directive');
  exports.AceEditorDirective = directive_1.AceEditorDirective;
  var component_1 = $__require('./src/component');
  exports.AceEditorComponent = component_1.AceEditorComponent;
  return module.exports;
});