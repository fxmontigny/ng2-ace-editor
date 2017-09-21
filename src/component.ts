import { Component, EventEmitter, Output, ElementRef, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import 'brace';
import 'brace/theme/monokai';
import 'brace/mode/html';

declare var ace: any;

@Component({
    selector: 'ace-editor',
    template: '',
    styles: [':host { display:block;width:100%; }'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AceEditorComponent),
        multi: true
    }]
})
export class AceEditorComponent implements ControlValueAccessor, OnInit {
    @Output() textChanged = new EventEmitter();
    @Output() textChange = new EventEmitter();
    @Input() style: any = {};
    _options: any = {};
    _readOnly: boolean = false;
    _theme: string = "monokai";
    _mode: any = "html";
    _autoUpdateContent: boolean = true;
    _editor: any;
    _durationBeforeCallback: number = 0;
    _text: string = "";
    oldText: any;
    timeoutSaving: any;

    constructor(elementRef: ElementRef) {
        let el = elementRef.nativeElement;
        this._editor = ace["edit"](el);
        this._editor.$blockScrolling = Infinity;
    }

    ngOnInit() {
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
        this._editor.on('change', () => this.updateText());
        this._editor.on('paste', () => this.updateText());
    }

    updateText() {
        let newVal = this._editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
        if (typeof this.oldText !== 'undefined') {
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.textChange.emit(newVal);
                this.textChanged.emit(newVal);
                this._onChange(newVal);
            } else {
                if (this.timeoutSaving) {
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
        if (typeof this._mode === 'object') {
            this._editor.getSession().setMode(this._mode);
        } else {
            this._editor.getSession().setMode(`ace/mode/${this._mode}`);
        }
    }

    get value() {
        return this.text;
    }

    @Input()
    set value(value: string) {
        this.setText(value);
    }

    writeValue(value: any) {
        this.setText(value);
    }

    private _onChange = (_: any) => {
    };

    registerOnChange(fn: any) {
        this._onChange = fn;
    }

    private _onTouched = () => {
    };

    registerOnTouched(fn: any) {
        this._onTouched = fn;
    }

    get text() {
        return this._text;
    }

    @Input()
    set text(text: string) {
        this.setText(text);
    }

    setText(text: any) {
        if (text === null || text === undefined) {
            text = "";
        }
        if (this._text !== text && this._autoUpdateContent === true) {
            this._text = text;
            this._editor.setValue(text);
            this._onChange(text);
            this._editor.clearSelection();
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
