import { Routes } from '@angular/router';
import { ApplayoutComponent } from '../Components/applayout/applayout.component';
import { authGuard } from '../Guards/auth.guard';
import { CourseListComponent } from '../Components/course-list/course-list.component';
import { LogInComponent } from '../Components/log-in/log-in.component';
import { RegisterComponent } from '../Components/register/register.component';
import { EditCourseComponent } from '../Components/edit-course/edit-course.component';
import { AddCourseComponent } from '../Components/add-course/add-course.component';
import { CourseDetailsComponent } from '../Components/course-details/course-details.component';

export const routes: Routes = [
    {
        path: '', component: ApplayoutComponent, canActivate: [authGuard], children: [
            { path: 'courses', component: CourseListComponent },
            { path: 'course-details/:courseId', component: CourseDetailsComponent },
            { path: 'add-course/:userId', component:AddCourseComponent },
            { path: 'update-course/:courseId', component: EditCourseComponent }        ]
    },
    {path:'login',component:LogInComponent},
    {path:'register',component:RegisterComponent}
];
