import { Component, Input } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Observable } from 'rxjs';
import { Course } from '../../Models/course';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../Models/lesson';
import { LessonService } from '../../Services/lesson.service';

@Component({
  selector: 'app-courses-management',
  imports: [MatFormFieldModule, MatInputModule, FormsModule,MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,CommonModule],
  templateUrl: './courses-management.component.html',
  styleUrl: './courses-management.component.css'
})
export class CoursesManagementComponent {
 @Input() courseId=-1; 
 course$ :Observable<Course>
 lessons$ :Observable<Lesson[]>
 constructor(private courseService:CourseService,private lessonService:LessonService){
  this.course$=this.courseService.getCourse(this.courseId);
  this.lessons$=this.lessonService.getLessons(this.courseId);
 }

}
