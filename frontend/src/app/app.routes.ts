import { Routes } from '@angular/router';
import { LearningComponent } from './pages/learning/learning.component';
import { LandingComponent } from './pages/landing/landing.component';
import { InstructorProfileComponent } from './pages/instructor-profile/instructor-profile.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterStudentComponent } from './pages/auth/register-student/register-student.component';


export const routes: Routes = [
    { path: 'learning', component:LearningComponent}, 
     {path:'landing', component:LandingComponent},
     { path:'', component:InstructorProfileComponent},
     {path:'login', component:LoginComponent},
     {path: 'register', component:RegisterStudentComponent}
];

