import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
// import { QuizToken } from 'typescript';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent}

];


export const router = RouterModule.forRoot(appRoutes);
