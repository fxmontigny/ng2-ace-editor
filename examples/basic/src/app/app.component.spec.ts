import {TestBed, async, ComponentFixture} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {AceEditorModule} from "ng2-ace-editor";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [AceEditorModule],
        });

        fixture = TestBed.createComponent(AppComponent);
    }));

    it('should render title in a h1 tag', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Basic');
    }));
});
