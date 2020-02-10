import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AceEditorModule } from '@pat/ng2-ace-editor';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AceEditorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
