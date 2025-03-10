import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../Models/course';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../Services/course.service';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-edit-course',
  imports: [RouterModule,MatButtonModule,MatCardModule,ReactiveFormsModule,MatIconModule, CommonModule, MatListModule, MatFormFieldModule, MatInputModule, MatExpansionModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  router=inject(Router)
  courseId!: number;
  courseForm!: FormGroup;
  course!: Course
constructor(private route: ActivatedRoute,private fb: FormBuilder,private coursesService: CourseService,private authService: AuthService) {
  this.courseForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });
}
ngOnInit(): void {
  this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')?.toString() ?? '');
  this.coursesService.getCourse(this.courseId).subscribe(res => {
    this.course = res;
    this.courseForm = this.fb.group({
      title: [this.course.title, Validators.required],
      description: [this.course.description, Validators.required]
    });
  });
  }

  updateCourse() {
    if (this.courseForm.valid) {
      const updatedCourse: Course = {
        id: this.courseId,
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        teacherId: this.authService.userId
      };
      this.coursesService.updateCourse(updatedCourse).subscribe(() => {
        console.log('Course updated successfully');
      });
      this.coursesService.getCourses();
      this.router.navigate(['/courses']);
    }
  }

}
