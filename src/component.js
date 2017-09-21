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
var forms_1 = require('@angular/forms');
require('brace');
require('brace/theme/monokai');
require('brace/mode/html');
var AceEditorComponent = (function () {
    function AceEditorComponent(elementRef) {
        this.textChanged = new core_1.EventEmitter();
        this.textChange = new core_1.EventEmitter();
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
        //}
        //ngOnInit() {
        this.init();
        this.initEvents();
    }

    AceEditorComponent.prototype.ngOnInit = function () {
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "textChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "textChange", void 0);
    __decorate([
        core_1.Input(), 
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
        __metadata('design:type', Object)
    ], AceEditorComponent.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
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
            styles: [':host { display:block;width:100%; }'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AceEditorComponent; }),
                    multi: true
                }]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AceEditorComponent);
    return AceEditorComponent;
}());
exports.AceEditorComponent = AceEditorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUYsZUFBZSxDQUFDLENBQUE7QUFDckcsc0JBQXNELGdCQUFnQixDQUFDLENBQUE7QUFDdkUsUUFBTyxPQUFPLENBQUMsQ0FBQTtBQUNmLFFBQU8scUJBQXFCLENBQUMsQ0FBQTtBQUM3QixRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFjekI7SUFlSSw0QkFBWSxVQUFzQjtRQWR4QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNqQyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLFVBQUssR0FBUSxNQUFNLENBQUM7UUFDcEIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBRW5DLDRCQUF1QixHQUFXLENBQUMsQ0FBQztRQUNwQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBNkdYLGNBQVMsR0FBRyxVQUFDLENBQU07UUFDM0IsQ0FBQyxDQUFDO1FBTU0sZUFBVSxHQUFHO1FBQ3JCLENBQUMsQ0FBQztRQWhIRSxJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLEdBQUc7UUFFSCxjQUFjO1FBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxxQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELGlDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElB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M0MsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBRUQsc0RBQXlCLEdBQXpCLFVBQTBCLEdBQVc7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztJQUN2QyxDQUFDO0lBRUQsc0NBQVMsR0FBVDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUE1S0Q7UUFBQyxhQUFNLEVBQUU7OzJEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OzBEQUFBO0lBQ1Q7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBZ0VSO1FBQUMsWUFBSyxFQUFFOzs7cURBQUE7SUFTUjtRQUFDLFlBQUssRUFBRTs7O3NEQUFBO0lBU1I7UUFBQyxZQUFLLEVBQUU7OzttREFBQTtJQVNSO1FBQUMsWUFBSyxFQUFFOzs7a0RBQUE7SUFpQlI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBMkJSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQWlCUjtRQUFDLFlBQUssRUFBRTs7OytEQUFBO0lBUVI7UUFBQyxZQUFLLEVBQUU7OztvRUFBQTtJQTdLWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDLHFDQUFxQyxDQUFDO1lBQy9DLFNBQVMsRUFBRSxDQUFDO29CQUNSLE9BQU8sRUFBRSx5QkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQztvQkFDakQsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQztTQUNMLENBQUM7OzBCQUFBO0lBK0tGLHlCQUFDO0FBQUQsQ0FBQyxBQTlLRCxJQThLQztBQTlLWSwwQkFBa0IscUJBOEs5QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBFbGVtZW50UmVmLCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0ICdicmFjZSc7XHJcbmltcG9ydCAnYnJhY2UvdGhlbWUvbW9ub2thaSc7XHJcbmltcG9ydCAnYnJhY2UvbW9kZS9odG1sJztcclxuXHJcbmRlY2xhcmUgdmFyIGFjZTogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjZS1lZGl0b3InLFxyXG4gICAgdGVtcGxhdGU6ICcnLFxyXG4gICAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTpibG9jazt3aWR0aDoxMDAlOyB9J10sXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWNlRWRpdG9yQ29tcG9uZW50KSxcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjZUVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xyXG4gICAgQE91dHB1dCgpIHRleHRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHRleHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55ID0ge307XHJcbiAgICBfb3B0aW9uczogYW55ID0ge307XHJcbiAgICBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF90aGVtZTogc3RyaW5nID0gXCJtb25va2FpXCI7XHJcbiAgICBfbW9kZTogYW55ID0gXCJodG1sXCI7XHJcbiAgICBfYXV0b1VwZGF0ZUNvbnRlbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgX2VkaXRvcjogYW55O1xyXG4gICAgX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2s6IG51bWJlciA9IDA7XHJcbiAgICBfdGV4dDogc3RyaW5nID0gXCJcIjtcclxuICAgIG9sZFRleHQ6IGFueTtcclxuICAgIHRpbWVvdXRTYXZpbmc6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuX2VkaXRvciA9IGFjZVtcImVkaXRcIl0oZWwpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL25nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMgfHwge30pO1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWUodGhpcy5fdGhlbWUpO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZSh0aGlzLl9tb2RlKTtcclxuICAgICAgICB0aGlzLnNldFJlYWRPbmx5KHRoaXMuX3JlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5vbignY2hhbmdlJywgKCkgPT4gdGhpcy51cGRhdGVUZXh0KCkpO1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5vbigncGFzdGUnLCAoKSA9PiB0aGlzLnVwZGF0ZVRleHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGV4dCgpIHtcclxuICAgICAgICBsZXQgbmV3VmFsID0gdGhpcy5fZWRpdG9yLmdldFZhbHVlKCksIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlmIChuZXdWYWwgPT09IHRoaXMub2xkVGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbGRUZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDaGFuZ2UuZW1pdChuZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q2hhbmdlZC5lbWl0KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZShuZXdWYWwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dFNhdmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRTYXZpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dFNhdmluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RleHQgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXh0Q2hhbmdlLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRleHRDaGFuZ2VkLmVtaXQobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRpbWVvdXRTYXZpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5fZHVyYXRpb25CZWZvcmVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbGRUZXh0ID0gbmV3VmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCByZWFkT25seShyZWFkT25seTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRSZWFkT25seShyZWFkT25seSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVhZE9ubHkocmVhZE9ubHk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XHJcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNldFJlYWRPbmx5KHJlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzZXQgdGhlbWUodGhlbWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWUodGhlbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhlbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGUobW9kZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tb2RlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUodGhpcy5fbW9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKGBhY2UvbW9kZS8ke3RoaXMuX21vZGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRUZXh0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHtcclxuICAgIH07XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGV4dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHRleHQodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXRUZXh0KHRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRleHQodGV4dDogYW55KSB7XHJcbiAgICAgICAgaWYgKHRleHQgPT09IG51bGwgfHwgdGV4dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdGV4dCAhPT0gdGV4dCAmJiB0aGlzLl9hdXRvVXBkYXRlQ29udGVudCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSh0ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBhdXRvVXBkYXRlQ29udGVudChzdGF0dXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0QXV0b1VwZGF0ZUNvbnRlbnQoc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBdXRvVXBkYXRlQ29udGVudChzdGF0dXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2F1dG9VcGRhdGVDb250ZW50ID0gc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBkdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXREdXJhdGlvbkJlZm9yZUNhbGxiYWNrKG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RHVyYXRpb25CZWZvcmVDYWxsYmFjayhudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uQmVmb3JlQ2FsbGJhY2sgPSBudW07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWRpdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XHJcbiAgICB9XHJcbn1cclxuIl19