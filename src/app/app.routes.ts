import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
// import { QuizToken } from 'typescript';

const appRoutes: Routes = [
  // {path: '', component: WelcomeComponent},
  {path: '', component: QuizComponent},
  {path: ':id', component: QuizComponent}
];


export const router = RouterModule.forRoot(appRoutes);
