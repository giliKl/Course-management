import { Component, inject } from '@angular/core';
import { Course } from '../../Models/course';
import { CourseService } from '../../Services/course.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { role } from '../../Models/user';
import { CoursesManagementComponent } from '../courses-management/courses-management.component';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CoursesManagementComponent, EditCourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  router = inject(Router);
  courses$: Observable<Course[]>;
  isCourseDitails = false;
  isEditCourse = false;
  courseId = -1;
  constructor(private courseService: CourseService, private authService: AuthService) {
    this.courses$ = this.courseService.getCourses();
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
  }
  add(){
    const userId = this.authService.userId;
    this.router.navigate(['/add-course', userId]);
  }
}
