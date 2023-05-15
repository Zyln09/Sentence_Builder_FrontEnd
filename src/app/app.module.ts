import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordTypeComponent } from './word-type/word-type.component';
import { WordListComponent } from './word-list/word-list.component';
import { SentenceBuilderComponent } from './sentence-builder/sentence-builder.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Add this line


@NgModule({
  declarations: [
    AppComponent,
    WordTypeComponent,
    WordListComponent,
    SentenceBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
