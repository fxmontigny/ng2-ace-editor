(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('brace'), require('brace/theme/textmate'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'brace', 'brace/theme/textmate', '@angular/forms'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.ng2aceeditor = {}), global.ng.core, null, null, global.ng.forms));
}(this, function (exports, core, brace, textmate, forms) { 'use strict';


    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var AceEditorDirective = /** @class */ (function () {
        function AceEditorDirective(elementRef, zone) {
            var _this = this;
            this.zone = zone;
            this.textChanged = new core.EventEmitter();
            this.textChange = new core.EventEmitter();
            this._options = {};
            this._readOnly = false;
            this._theme = "textmate";
            this._mode = "xml";
            this._autoUpdateContent = true;
            this._durationBeforeCallback = 0;
            this._text = "";
            var el = elementRef.nativeElement;
            this.zone.runOutsideAngular(function () {
                _this.editor = ace["edit"](el);
            });
            this.editor.$blockScrolling = Infinity;
        }
        AceEditorDirective.prototype.ngOnInit = function () {
            this.init();
            this.initEvents();
        };
        AceEditorDirective.prototype.ngOnDestroy = function () {
            this.editor.destroy();
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
            var _this = this;
            var newVal = this.editor.getValue();
            if (newVal === this.oldText) {
                return;
            }
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.zone.run(function () {
                    _this.textChange.emit(newVal);
                    _this.textChanged.emit(newVal);
                });
            }
            else {
                if (this.timeoutSaving != null) {
                    clearTimeout(this.timeoutSaving);
                }
                this.timeoutSaving = setTimeout(function () {
                    _this._text = newVal;
                    _this.zone.run(function () {
                        _this.textChange.emit(newVal);
                        _this.textChanged.emit(newVal);
                    });
                    _this.timeoutSaving = null;
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
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AceEditorDirective.prototype, "textChanged", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AceEditorDirective.prototype, "textChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], AceEditorDirective.prototype, "options", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], AceEditorDirective.prototype, "readOnly", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], AceEditorDirective.prototype, "theme", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], AceEditorDirective.prototype, "mode", null);
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], AceEditorDirective.prototype, "text", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], AceEditorDirective.prototype, "autoUpdateContent", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], AceEditorDirective.prototype, "durationBeforeCallback", null);
        AceEditorDirective = __decorate([
            core.Directive({
                selector: '[ace-editor]'
            }),
            __metadata("design:paramtypes", [core.ElementRef, core.NgZone])
        ], AceEditorDirective);
        return AceEditorDirective;
    }());

    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var AceEditorComponent = /** @class */ (function () {
        function AceEditorComponent(elementRef, zone) {
            var _this = this;
            this.zone = zone;
            this.textChanged = new core.EventEmitter();
            this.textChange = new core.EventEmitter();
            this.style = {};
            this._options = {};
            this._readOnly = false;
            this._theme = "textmate";
            this._mode = "xml";
            this._autoUpdateContent = true;
            this._durationBeforeCallback = 0;
            this._text = "";
            this._onChange = function (_) {
            };
            this._onTouched = function () {
            };
            var el = elementRef.nativeElement;
            this.zone.runOutsideAngular(function () {
                _this._editor = ace['edit'](el);
            });
            this._editor.$blockScrolling = Infinity;
        }
        AceEditorComponent_1 = AceEditorComponent;
        AceEditorComponent.prototype.ngOnInit = function () {
            this.init();
            this.initEvents();
        };
        AceEditorComponent.prototype.ngOnDestroy = function () {
            this._editor.destroy();
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
            var _this = this;
            var newVal = this._editor.getValue();
            if (newVal === this.oldText) {
                return;
            }
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.zone.run(function () {
                    _this.textChange.emit(newVal);
                    _this.textChanged.emit(newVal);
                });
                this._onChange(newVal);
            }
            else {
                if (this.timeoutSaving) {
                    clearTimeout(this.timeoutSaving);
                }
                this.timeoutSaving = setTimeout(function () {
                    _this._text = newVal;
                    _this.zone.run(function () {
                        _this.textChange.emit(newVal);
                        _this.textChanged.emit(newVal);
                    });
                    _this.timeoutSaving = null;
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
        var AceEditorComponent_1;
        __decorate$1([
            core.Output(),
            __metadata$1("design:type", Object)
        ], AceEditorComponent.prototype, "textChanged", void 0);
        __decorate$1([
            core.Output(),
            __metadata$1("design:type", Object)
        ], AceEditorComponent.prototype, "textChange", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], AceEditorComponent.prototype, "style", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], AceEditorComponent.prototype, "options", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], AceEditorComponent.prototype, "readOnly", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], AceEditorComponent.prototype, "theme", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], AceEditorComponent.prototype, "mode", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", String),
            __metadata$1("design:paramtypes", [String])
        ], AceEditorComponent.prototype, "value", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", String),
            __metadata$1("design:paramtypes", [String])
        ], AceEditorComponent.prototype, "text", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], AceEditorComponent.prototype, "autoUpdateContent", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Number),
            __metadata$1("design:paramtypes", [Number])
        ], AceEditorComponent.prototype, "durationBeforeCallback", null);
        AceEditorComponent = AceEditorComponent_1 = __decorate$1([
            core.Component({
                selector: 'ace-editor',
                template: '',
                styles: [':host { display:block;width:100%; }'],
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AceEditorComponent_1; }),
                        multi: true
                    }]
            }),
            __metadata$1("design:paramtypes", [core.ElementRef, core.NgZone])
        ], AceEditorComponent);
        return AceEditorComponent;
    }());

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var list = [
        AceEditorComponent,
        AceEditorDirective
    ];
    var AceEditorModule = /** @class */ (function () {
        function AceEditorModule() {
        }
        AceEditorModule = __decorate$2([
            core.NgModule({
                declarations: list.slice(),
                imports: [],
                providers: [],
                exports: list
            })
        ], AceEditorModule);
        return AceEditorModule;
    }());

    exports.AceEditorDirective = AceEditorDirective;
    exports.AceEditorComponent = AceEditorComponent;
    exports.AceEditorModule = AceEditorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
