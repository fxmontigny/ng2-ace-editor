import {Component, EventEmitter, Output, ElementRef, Input} from '@angular/core';
import 'brace';
import 'brace/theme/monokai';
import 'brace/mode/html';

declare var ace: any;

@Component({
    selector: 'ace-editor',
    template: '',
    styles: [':host { display:block;width:100%; }']
})
export class AceEditorComponent {
    @Output('textChanged') textChanged = new EventEmitter();
    @Input('style') style: any = {};
    _options: any = {};
    _readOnly: boolean = false;
    _theme: string = "monokai";
    _mode: any = "html";
    _autoUpdateContent: boolean = true;
    _editor: any;
    _durationBeforeCallback: number = 0;
    oldText: any;
    timeoutSaving: any;

    constructor(elementRef: ElementRef) {
        let el = elementRef.nativeElement;
        this._editor = ace["edit"](el);

        this.init();
        this.initEvents();
    }

    init() {
        this.setOptions(this._options || {});
        this.setTheme(this._theme);
        this.setMode(this._mode);
        this.setReadOnly(this._readOnly);
    }

    initEvents() {
        let me = this;

        me._editor.on('change', () => {
            let newVal = me._editor.getValue();
            if (newVal === me.oldText) return;
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
    }

    @Input() set options(options: any) {
        this.setOptions(options);
    }

    setOptions(options: any) {
        this._options = options;
        this._editor.setOptions(options || {});
    }

    @Input() set readOnly(readOnly: any) {
        this.setReadOnly(readOnly);
    }

    setReadOnly(readOnly: any) {
        this._readOnly = readOnly;
        this._editor.setReadOnly(readOnly);
    }

    @Input() set theme(theme: any) {
        this.setTheme(theme);
    }

    setTheme(theme: any) {
        this._theme = theme;
        this._editor.setTheme(`ace/theme/${theme}`);
    }

    @Input() set mode(mode: any) {
        this.setMode(mode);
    }

    setMode(mode: any) {
        this._mode = mode;
        if (typeof this._mode == 'object') {
            this._editor.getSession().setMode(this._mode);
        }
        else {
            this._editor.getSession().setMode(`ace/mode/${this._mode}`);
        }
    }

    @Input() set text(text: any) {
        this.setText(text);
    }

    setText(text: any) {
        if (text == null)
            text = "";

        if (this._autoUpdateContent == true) {
            this._editor.setValue(text);
            this._editor.clearSelection();
            this._editor.focus();
        }
    }

    @Input() set autoUpdateContent(status: any) {
        this.setAutoUpdateContent(status);
    }

    setAutoUpdateContent(status: any) {
        this._autoUpdateContent = status;
    }

    @Input() set durationBeforeCallback(num: number) {
        this.setDurationBeforeCallback(num);
    }

    setDurationBeforeCallback(num: number) {
        this._durationBeforeCallback = num;
    }

    getEditor() {
        return this._editor;
    }
}
