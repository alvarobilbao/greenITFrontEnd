import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { router } from './app.routes';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { JsonquestionService } from './services/jsonquestion.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    router
  ],
  providers: [JsonquestionService,
              ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
