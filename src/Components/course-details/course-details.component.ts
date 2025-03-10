import { Component, inject, Input } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Observable } from 'rxjs';
import { Course } from '../../Models/course';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lesson, partOfLesson } from '../../Models/lesson';
import { LessonService } from '../../Services/lesson.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LessonUpdateComponent } from "../lesson-update/lesson-update.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-course-details',
  imports: [RouterOutlet, MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule, FormsModule, RouterModule,
    CommonModule, ReactiveFormsModule, LessonUpdateComponent, CardModule, ButtonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  router = inject(Router);
  courseId = -1;
  IsAdding = false;
  lessonForm!: FormGroup;
  newlesson: Lesson | undefined;
  lessonId: number = -1;
  openUpdate = false;
  course$!: Observable<Course>
  lessons = [] as Lesson[]
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courseService: CourseService, private lessonService: LessonService, private authService: AuthService) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')?.toString() ?? '');
    this.course$ = this.courseService.getCourse(this.courseId);
    this.getnewlessons()
  }
  getnewlessons(){
    this.lessonService.getLessons(this.courseId);
    this.lessonService.lessons$.subscribe(lessons => {
      this.lessons = lessons;
      console.log(this.lessons);
    }); 
  }
  getAuthRole(): string {
    return this.authService.role;
  }
  handelOpen() {
    this.lessonForm.reset();
    this.IsAdding = !this.IsAdding
  }
  addLesson() {
    if (this.lessonForm.valid) {
      this.newlesson = this.lessonForm.value;
      if (this.newlesson) {
        this.lessonService.addLesson(this.courseId.toString(), this.newlesson).subscribe({
          next: res => {
            console.log('Success:', res);
            this.getnewlessons()
          },
          error: err => console.error('Error:', err)
        })
      }
      this.IsAdding = !this.IsAdding
    }
  }
  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(this.courseId.toString(), lessonId.toString()).subscribe({
      next: res => {
        console.log('Success:', res);
        this.getnewlessons() 
            },
      error: err => console.error('Error:', err)
    })

  }
  updateLesson(lessonId: number) {
    this.lessonId = lessonId
    this.openUpdate = !this.openUpdate
  }
  IsupdateLesson() {
    console.log("hello");
    this.openUpdate = !this.openUpdate
    this.getnewlessons()
  }
 
}
