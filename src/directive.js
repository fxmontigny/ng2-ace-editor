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
            if (newVal === _this.oldText)
                return;
            if (typeof _this.oldText !== 'undefined')
                _this.textChanged.emit(newVal);
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
        }
        else {
            this.editor.getSession().setMode("ace/mode/" + this._mode);
        }
    };
    Object.defineProperty(AceEditorDirective.prototype, "text", {
        set: function (text) {
            if (text == null)
                text = "";
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
    __decorate([
        core_1.Output('textChanged'), 
        __metadata('design:type', Object)
    ], AceEditorDirective.prototype, "textChanged", void 0);
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
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "text", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorDirective.prototype, "autoUpdateContent", null);
    AceEditorDirective = __decorate([
        core_1.Directive({
            selector: '[ace-editor]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorDirective);
    return AceEditorDirective;
}());
exports.AceEditorDirective = AceEditorDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUUsZUFBZSxDQUFDLENBQUE7QUFDakYsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFPekI7SUFVSSw0QkFBWSxVQUFzQjtRQVRYLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDeEQsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsVUFBSyxHQUFRLE1BQU0sQ0FBQztRQUNwQix1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFLL0IsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGlDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWEsSUFBSSxDQUFDLE1BQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUFBLGlCQVFDO1FBUEcsSUFB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QTtJQUtSO1FBQUMsWUFBSyxFQUFFOzs7a0RBQUE7SUFjUjtRQUFDLFlBQUssRUFBRTs7O2tEQUFBO0lBV1I7UUFBQyxZQUFLLEVBQUU7OzsrREFBQTtJQTlFWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztTQUMzQixDQUFDOzswQkFBQTtJQW1GRix5QkFBQztBQUFELENBQUMsQUFsRkQsSUFrRkM7QUFsRlksMEJBQWtCLHFCQWtGOUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgJ2JyYWNlJztcclxuaW1wb3J0ICdicmFjZS90aGVtZS9tb25va2FpJztcclxuaW1wb3J0ICdicmFjZS9tb2RlL2h0bWwnO1xyXG5cclxuZGVjbGFyZSB2YXIgYWNlOiBhbnk7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2FjZS1lZGl0b3JdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWNlRWRpdG9yRGlyZWN0aXZlIHtcclxuICAgIEBPdXRwdXQoJ3RleHRDaGFuZ2VkJykgdGV4dENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBfb3B0aW9uczogYW55ID0ge307XHJcbiAgICBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF90aGVtZTogc3RyaW5nID0gXCJtb25va2FpXCI7XHJcbiAgICBfbW9kZTogYW55ID0gXCJodG1sXCI7XHJcbiAgICBfYXV0b1VwZGF0ZUNvbnRlbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgZWRpdG9yOiBhbnk7XHJcbiAgICBvbGRUZXh0OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLmVkaXRvciA9IGFjZVtcImVkaXRcIl0oZWwpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VGhlbWUoYGFjZS90aGVtZS8ke3RoaXMuX3RoZW1lfWApO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZSh0aGlzLl9tb2RlKTtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRSZWFkT25seSh0aGlzLl9yZWFkT25seSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLmVkaXRvci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3VmFsID0gdGhpcy5lZGl0b3IuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbCA9PT0gdGhpcy5vbGRUZXh0KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbGRUZXh0ICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENoYW5nZWQuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFRleHQgPSBuZXdWYWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgcmVhZE9ubHkocmVhZE9ubHk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0UmVhZE9ubHkocmVhZE9ubHkpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCB0aGVtZSh0aGVtZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhlbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tb2RlID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoYGFjZS9tb2RlLyR7dGhpcy5fbW9kZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHRleHQodGV4dDogYW55KSB7XHJcbiAgICAgICAgaWYgKHRleHQgPT0gbnVsbClcclxuICAgICAgICAgICAgdGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9hdXRvVXBkYXRlQ29udGVudCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNldFZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgYXV0b1VwZGF0ZUNvbnRlbnQoc3RhdHVzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9hdXRvVXBkYXRlQ29udGVudCA9IHN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWNlRWRpdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvcjtcclxuICAgIH1cclxufVxyXG4iXX0=