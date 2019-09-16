import { Component, ViewChild, AfterViewInit } from "@angular/core";
import "brace/theme/github";
import "brace/mode/sql";
declare let ace: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  content = "<strong>Hi</strong>";
  contentAutoUpdate = "SELECT * FROM autoUpdate;";
  myCode = "SELECT * FROM tabs;";
  @ViewChild("highlight", { static: false }) highlight;
  @ViewChild("editorInfinity", { static: false }) editorInfinity;
  @ViewChild("firstEditor", { static: false }) firstEditor;

  onRuleChange(e) {
    console.log(e);
  }

  ngAfterViewInit() {
    const Range = ace.require("ace/range")["Range"];

    this.highlight
      .getEditor()
      .session.addMarker(new Range(0, 0, 2, 1), "myMarker", "fullLine");

    this.firstEditor.getEditor().session.setOption("useWorker", true);
  }
}
