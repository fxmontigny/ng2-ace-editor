"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('brace');
require('brace/theme/monokai');
require('brace/mode/html');
var AceEditorDirective = (function () {
    function AceEditorDirective(elementRef) {
        this.textChanged = new core_1.EventEmitter();
        this.textChange = new core_1.EventEmitter();
        this._options = {};
        this._readOnly = false;
        this._theme = "monokai";
        this._mode = "html";
        this._autoUpdateContent = true;
        this._durationBeforeCallback = 0;
        this._text = "";
        var el = elementRef.nativeElement;
        this.editor = ace["edit"](el);
        // }
        //ngOnInit() {
        this.init();
        this.initEvents();
    }

    AceEditorDirective.prototype.ngOnInit = function () {
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "textChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "textChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "options", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "readOnly", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "theme", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "mode", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "text", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "autoUpdateContent", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], AceEditorDirective.prototype, "durationBeforeCallback", null);
    AceEditorDirective = __decorate([
        core_1.Directive({
            selector: '[ace-editor]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorDirective);
    return AceEditorDirective;
}());
exports.AceEditorDirective = AceEditorDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUUsZUFBZSxDQUFDLENBQUE7QUFDekYsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFPekI7SUFjSSw0QkFBWSxVQUFzQjtRQWJ4QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUMxQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixVQUFLLEdBQVEsTUFBTSxDQUFDO1FBQ3BCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUNuQyw0QkFBdUIsR0FBVyxDQUFDLENBQUM7UUFDcEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQU1mLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSTtRQUVKLGNBQWM7UUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHFDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBYSxJQUFJLENBQUMsTUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8s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LGlEQUFpQjthQUFyQixVQUFzQixNQUFXO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFFUSxzQkFBSSxzREFBc0I7YUFBMUIsVUFBMkIsR0FBVztZQUMzQyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFRCxzREFBeUIsR0FBekIsVUFBMEIsR0FBVztRQUNqQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxzQkFBSSx5Q0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFuSUQ7UUFBQyxhQUFNLEVBQUU7OzJEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OzBEQUFBO0lBaUVUO1FBQUMsWUFBSyxFQUFFOzs7cURBQUE7SUFLUjtRQUFDLFlBQUssRUFBRTs7O3NEQUFBO0lBS1I7UUFBQyxZQUFLLEVBQUU7OzttREFBQTtJQUtSO1FBQUMsWUFBSyxFQUFFOzs7a0RBQUE7SUFhUjtRQUFDLFlBQUssRUFBRTs7a0RBQUE7SUF1QlI7UUFBQyxZQUFLLEVBQUU7OzsrREFBQTtJQUlSO1FBQUMsWUFBSyxFQUFFOzs7b0VBQUE7SUE3SFo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7U0FDM0IsQ0FBQzs7MEJBQUE7SUFzSUYseUJBQUM7QUFBRCxDQUFDLEFBcklELElBcUlDO0FBcklZLDBCQUFrQixxQkFxSTlCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgJ2JyYWNlJztcclxuaW1wb3J0ICdicmFjZS90aGVtZS9tb25va2FpJztcclxuaW1wb3J0ICdicmFjZS9tb2RlL2h0bWwnO1xyXG5cclxuZGVjbGFyZSB2YXIgYWNlOiBhbnk7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2FjZS1lZGl0b3JdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWNlRWRpdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgX29wdGlvbnM6IGFueSA9IHt9O1xyXG4gICAgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfdGhlbWU6IHN0cmluZyA9IFwibW9ub2thaVwiO1xyXG4gICAgX21vZGU6IGFueSA9IFwiaHRtbFwiO1xyXG4gICAgX2F1dG9VcGRhdGVDb250ZW50OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIF9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrOiBudW1iZXIgPSAwO1xyXG4gICAgX3RleHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBlZGl0b3I6IGFueTtcclxuICAgIG9sZFRleHQ6IGFueTtcclxuICAgIHRpbWVvdXRTYXZpbmc6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZWRpdG9yID0gYWNlW1wiZWRpdFwiXShlbCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvL25nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyh0aGlzLl9vcHRpb25zIHx8IHt9KTtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhpcy5fdGhlbWV9YCk7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFJlYWRPbmx5KHRoaXMuX3JlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RXZlbnRzKCkge1xyXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIG1lLmVkaXRvci5vbignY2hhbmdlJywgKCkgPT4gdGhpcy51cGRhdGVUZXh0KCkpO1xyXG4gICAgICAgIG1lLmVkaXRvci5vbigncGFzdGUnLCAoKSA9PiB0aGlzLnVwZGF0ZVRleHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGV4dCgpIHtcclxuICAgICAgICBsZXQgbmV3VmFsID0gdGhpcy5lZGl0b3IuZ2V0VmFsdWUoKSwgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKG5ld1ZhbCA9PT0gdGhpcy5vbGRUZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9sZFRleHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZHVyYXRpb25CZWZvcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dCA9IG5ld1ZhbDtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENoYW5nZS5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDaGFuZ2VkLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVvdXRTYXZpbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRTYXZpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dFNhdmluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RleHQgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXh0Q2hhbmdlLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRleHRDaGFuZ2VkLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRpbWVvdXRTYXZpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbGRUZXh0ID0gbmV3VmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldE9wdGlvbnMob3B0aW9ucyB8fCB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHJlYWRPbmx5KHJlYWRPbmx5OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFJlYWRPbmx5KHJlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgdGhlbWUodGhlbWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3RoZW1lID0gdGhlbWU7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VGhlbWUoYGFjZS90aGVtZS8ke3RoZW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBtb2RlKG1vZGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZShtb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RlKG1vZGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbW9kZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUodGhpcy5fbW9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoYGFjZS9tb2RlLyR7dGhpcy5fbW9kZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCB0ZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0ZXh0KHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dCh0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXh0KHRleHQ6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0ICE9PSB0ZXh0KSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0ID09PSBudWxsIHx8IHRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdXRvVXBkYXRlQ29udGVudCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IGF1dG9VcGRhdGVDb250ZW50KHN0YXR1czogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fYXV0b1VwZGF0ZUNvbnRlbnQgPSBzdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IGR1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldER1cmF0aW9uQmVmb3JlQ2FsbGJhY2sobnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWNlRWRpdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvcjtcclxuICAgIH1cclxufVxyXG4iXX0=