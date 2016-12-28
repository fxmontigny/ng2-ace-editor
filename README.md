# ng2-ace-editor

[![npm version](https://badge.fury.io/js/ng2-ace-editor.svg)](https://www.npmjs.com/package/ng2-ace-editor) 
Ace editor integration with typescript for angular 2.

# Install
`npm i -s ng2-ace-editor`

# Use directive

> Minimal

```js
//add "AceEditorDirective" to your modules list

import { Component } from '@angular/core';

@Component({
  template: `
  <div ace-editor
       [text]="text"></div>
  `
})
export class MyComponent {
    text:string = "";
}
```

> Complete

```js
//add "AceEditorDirective" to your modules list
//import { AceEditorDirective } from 'ng2-ace-editor';

import { Component } from '@angular/core';

//to use theme "eclipse"
//with angular-cli add "../node_modules/ace-builds/src-min/ace.js" 
//and "../node_modules/ace-builds/src-min/theme-eclipse.js" to "scripts" var into the file angular-cli.json

@Component({
  template: `
  <div ace-editor
       [text]="text"
       [mode]="'sql'" //string or object
       [theme]="'eclipse'"
       [options]="options"
       [readOnly]="false"
       [autoUpdateContent]="true" //change content when [text] change
       [durationBeforeCallback]="1000" //wait 1s before callback 'textChanged' sends new value
       (textChanged)="onChange($event)"
       style="min-height: 200px; width:100%; overflow: auto;"></div>
  `
})
export class MyComponent {
    text:string = "";
    options:any = {maxLines: 1000, printMargin: false};
    
    onChange(code) {
        console.log("new code", code);
    }
}
```

# Use Component

```js
//add "AceEditorComponent" to your modules list
//import { AceEditorComponent } from 'ng2-ace-editor';

import {Component, ViewChild} from '@angular/core';

//to use theme eclipse
//with angular-cli add "../node_modules/ace-builds/src-min/ace.js" 
//and "../node_modules/ace-builds/src-min/theme-eclipse.js" to "scripts" var into the file angular-cli.json

@Component({
    template: `
  <ace-editor
       [text]="text" #editor style="height:150px;"></ace-editor>
  `
})
export class AceCmp {
    @ViewChild('editor') editor;
    text: string = "";

    ngAfterViewInit() {
        this.editor.setTheme("eclipse");

        this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true
        });

        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {

            }
        })
    }
}
```

# Used by
[caravel.design](https://www.caravel.design) - [example](https://app.caravel.design/p/58/sample-user-research/s/316/ab-testing/codeSample/184/button-a)
