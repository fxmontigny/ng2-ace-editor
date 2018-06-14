import { NgModule } from "@angular/core";
import { AceEditorComponent } from "./component";
import { AceEditorDirective } from "./directive";
var list = [
    AceEditorComponent,
    AceEditorDirective
];
var AceEditorModule = /** @class */ (function () {
    function AceEditorModule() {
    }
    AceEditorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: list.slice(),
                    imports: [],
                    providers: [],
                    exports: list
                },] },
    ];
    return AceEditorModule;
}());
export { AceEditorModule };
//# sourceMappingURL=module.js.map