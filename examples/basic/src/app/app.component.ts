import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialSql = "SELECT * FROM tabs;";
  session = "sql";
  editedQuery: any = {
    Query: ""
  }

  log(text) {
    console.log(text)
  }
}
