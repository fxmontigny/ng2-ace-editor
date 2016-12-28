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
var AceEditorComponent = (function () {
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
            if (newVal === me.oldText)
                return;
            if (typeof me.oldText !== 'undefined') {
                if (me._durationBeforeCallback == 0)
                    me.textChanged.emit(newVal);
                else {
                    if (me.timeoutSaving != null)
                        clearTimeout(me.timeoutSaving);
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
        }
        else {
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
        if (text == null)
            text = "";
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
    __decorate([
        core_1.Output('textChanged'), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "textChanged", void 0);
    __decorate([
        core_1.Input('style'), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "options", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "readOnly", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "theme", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "mode", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "text", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AceEditorComponent.prototype, "autoUpdateContent", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], AceEditorComponent.prototype, "durationBeforeCallback", null);
    AceEditorComponent = __decorate([
        core_1.Component({
            selector: 'ace-editor',
            template: '',
            styles: [':host { display:block;width:100%; }']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorComponent);
    return AceEditorComponent;
}());
exports.AceEditorComponent = AceEditorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUUsZUFBZSxDQUFDLENBQUE7QUFDakYsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFTekI7SUFhSSw0QkFBWSxVQUFzQjtRQVpYLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDeEMsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixVQUFLLEdBQVEsTUFBTSxDQUFDO1FBQ3BCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUVuQyw0QkFBdUIsR0FBVyxDQUFDLENBQUM7UUFLaEMsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGlDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHVDQUFVLEdBQVY7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Q0FBQzs7cURBQUE7SUFpRGY7UUFBQyxZQUFLLEVBQUU7OztxREFBQTtJQVNSO1FBQUMsWUFBSyxFQUFFOzs7c0RBQUE7SUFTUjtRQUFDLFlBQUssRUFBRTs7O21EQUFBO0lBU1I7UUFBQyxZQUFLLEVBQUU7OztrREFBQTtJQWNSO1FBQUMsWUFBSyxFQUFFOzs7a0RBQUE7SUFlUjtRQUFDLFlBQUssRUFBRTs7OytEQUFBO0lBUVI7UUFBQyxZQUFLLEVBQUU7OztvRUFBQTtJQXhIWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDLHFDQUFxQyxDQUFDO1NBQ2xELENBQUM7OzBCQUFBO0lBK0hGLHlCQUFDO0FBQUQsQ0FBQyxBQTlIRCxJQThIQztBQTlIWSwwQkFBa0IscUJBOEg5QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAnYnJhY2UnO1xyXG5pbXBvcnQgJ2JyYWNlL3RoZW1lL21vbm9rYWknO1xyXG5pbXBvcnQgJ2JyYWNlL21vZGUvaHRtbCc7XHJcblxyXG5kZWNsYXJlIHZhciBhY2U6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhY2UtZWRpdG9yJyxcclxuICAgIHRlbXBsYXRlOiAnJyxcclxuICAgIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTsgfSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY2VFZGl0b3JDb21wb25lbnQge1xyXG4gICAgQE91dHB1dCgndGV4dENoYW5nZWQnKSB0ZXh0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBJbnB1dCgnc3R5bGUnKSBzdHlsZTogYW55ID0ge307XHJcbiAgICBfb3B0aW9uczogYW55ID0ge307XHJcbiAgICBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF90aGVtZTogc3RyaW5nID0gXCJtb25va2FpXCI7XHJcbiAgICBfbW9kZTogYW55ID0gXCJodG1sXCI7XHJcbiAgICBfYXV0b1VwZGF0ZUNvbnRlbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgX2VkaXRvcjogYW55O1xyXG4gICAgX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2s6IG51bWJlciA9IDA7XHJcbiAgICBvbGRUZXh0OiBhbnk7XHJcbiAgICB0aW1lb3V0U2F2aW5nOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLl9lZGl0b3IgPSBhY2VbXCJlZGl0XCJdKGVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5zZXRUaGVtZSh0aGlzLl90aGVtZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIHRoaXMuc2V0UmVhZE9ubHkodGhpcy5fcmVhZE9ubHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRFdmVudHMoKSB7XHJcbiAgICAgICAgbGV0IG1lID0gdGhpcztcclxuXHJcbiAgICAgICAgbWUuX2VkaXRvci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3VmFsID0gbWUuX2VkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsID09PSBtZS5vbGRUZXh0KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWUub2xkVGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZS5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lLnRleHRDaGFuZ2VkLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZS50aW1lb3V0U2F2aW5nICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtZS50aW1lb3V0U2F2aW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWUudGltZW91dFNhdmluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS50ZXh0Q2hhbmdlZC5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLnRpbWVvdXRTYXZpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIG1lLl9kdXJhdGlvbkJlZm9yZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZS5vbGRUZXh0ID0gbmV3VmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCByZWFkT25seShyZWFkT25seTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRSZWFkT25seShyZWFkT25seSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVhZE9ubHkocmVhZE9ubHk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XHJcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNldFJlYWRPbmx5KHJlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgdGhlbWUodGhlbWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWUodGhlbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhlbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tb2RlID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZSh0aGlzLl9tb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShgYWNlL21vZGUvJHt0aGlzLl9tb2RlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgdGV4dCh0ZXh0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldFRleHQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGV4dCh0ZXh0OiBhbnkpIHtcclxuICAgICAgICBpZiAodGV4dCA9PSBudWxsKVxyXG4gICAgICAgICAgICB0ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBhdXRvVXBkYXRlQ29udGVudChzdGF0dXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0QXV0b1VwZGF0ZUNvbnRlbnQoc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBdXRvVXBkYXRlQ29udGVudChzdGF0dXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID0gc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBkdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXREdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RHVyYXRpb25CZWZvcmVDYWxsYmFjayhudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2sgPSBudW07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWRpdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XHJcbiAgICB9XHJcbn1cclxuIl19