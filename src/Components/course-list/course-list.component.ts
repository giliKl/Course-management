import { Component, inject } from '@angular/core';
import { Course } from '../../Models/course';
import { CourseService } from '../../Services/course.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { role } from '../../Models/user';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { Router, RouterOutlet } from '@angular/router';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseDetailsComponent, EditCourseComponent,RouterOutlet, MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,MatCardModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  router = inject(Router);
  courses$: Observable<Course[]>=of([]);
  isCourseDitails = false;
  displayedColumns: string[] = ['id', 'title', 'actions'];
  courseId = -1;
  constructor(private courseService: CourseService, private authService: AuthService) {
    this.courses$ = this.courseService.getCourses().pipe(
      map(courses => courses ? courses : []) // במקרה של null, נחזיר מערך ריק
    );;
    if(this.courses$==null){
      this.courses$=of([]);
    }
  };
  getAuthRole(): string {
    return this.authService.role;
  }
  enrollCourse(course: Course) {
    this.courseService.enroll(course.id, this.authService.userId).subscribe({
      next: () => {
        this.courses$ = this.courseService.getCourses();
        console.log("enroll successful");

      },
      error: () => {
        console.log("enroll failed");
      }
    });
  }
  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        this.courses$ = this.courseService.getCourses();
        console.log("delete successful");

      },
      error: () => {
        console.log("delete failed");
      }
    })
  }
  editCourse(course: Course) {
    this.router.navigate(['/update-course', course.id]);

  }
  courseDitails(courseId: number) {
    this.courseId = courseId;
    this.isCourseDitails = !this.isCourseDitails;
    this.router.navigate(['/course-details', courseId]);
  }
  add(){
    const userId = this.authService.userId;
    this.router.navigate(['/add-course', userId]);
  }
}
