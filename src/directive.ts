import { Directive, EventEmitter, Output, ElementRef, Input, OnInit } from '@angular/core';
import 'brace';
import 'brace/theme/monokai';
import 'brace/mode/html';

declare var ace: any;

@Directive({
    selector: '[ace-editor]'
})
export class AceEditorDirective implements OnInit {
    @Output() textChanged = new EventEmitter();
    @Output() textChange = new EventEmitter();
    _options: any = {};
    _readOnly: boolean = false;
    _theme: string = "monokai";
    _mode: any = "html";
    _autoUpdateContent: boolean = true;
    _durationBeforeCallback: number = 0;
    _text: string = "";
    editor: any;
    oldText: any;
    timeoutSaving: any;

    constructor(elementRef: ElementRef) {
        let el = elementRef.nativeElement;
        this.editor = ace["edit"](el);
        this.editor.$blockScrolling = Infinity;
    }

    ngOnInit() {
        this.init();
        this.initEvents();
    }

    init() {
        this.editor.setOptions(this._options || {});
        this.editor.setTheme(`ace/theme/${this._theme}`);
        this.setMode(this._mode);
        this.editor.setReadOnly(this._readOnly);
    }

    initEvents() {
        let me = this;

        me.editor.on('change', () => this.updateText());
        me.editor.on('paste', () => this.updateText());
    }

    updateText() {
        let newVal = this.editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
        if (typeof this.oldText !== 'undefined') {
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.textChange.emit(newVal);
                this.textChanged.emit(newVal);
            } else {
                if (this.timeoutSaving != null) {
                    clearTimeout(this.timeoutSaving);
                }

                this.timeoutSaving = setTimeout(function() {
                    that._text = newVal;
                    that.textChange.emit(newVal);
                    that.textChanged.emit(newVal);
                    that.timeoutSaving = null;
                }, this._durationBeforeCallback);
            }
        }
        this.oldText = newVal;
    }

    @Input() set options(options: any) {
        this._options = options;
        this.editor.setOptions(options || {});
    }

    @Input() set readOnly(readOnly: any) {
        this._readOnly = readOnly;
        this.editor.setReadOnly(readOnly);
    }

    @Input() set theme(theme: any) {
        this._theme = theme;
        this.editor.setTheme(`ace/theme/${theme}`);
    }

    @Input() set mode(mode: any) {
        this.setMode(mode);
    }

    setMode(mode: any) {
        this._mode = mode;
        if (typeof this._mode === 'object') {
            this.editor.getSession().setMode(this._mode);
        } else {
            this.editor.getSession().setMode(`ace/mode/${this._mode}`);
        }
    }

    @Input()
    get text() {
        return this._text;
    }

    set text(text: string) {
        this.setText(text);
    }

    setText(text: any) {
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
    }

    @Input() set autoUpdateContent(status: any) {
        this._autoUpdateContent = status;
    }

    @Input() set durationBeforeCallback(num: number) {
        this.setDurationBeforeCallback(num);
    }

    setDurationBeforeCallback(num: number) {
        this._durationBeforeCallback = num;
    }

    get aceEditor() {
        return this.editor;
    }
}
