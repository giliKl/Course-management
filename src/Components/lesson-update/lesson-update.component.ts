import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../Services/lesson.service';
import { Lesson } from '../../Models/lesson';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-lesson-update',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './lesson-update.component.html',
  styleUrl: './lesson-update.component.css'
})
export class LessonUpdateComponent {
  @Output() updateLessonEvent = new EventEmitter<void>(); 
  @Input() lessonId=-1;
@Input() courseId=-1;
 updateForm!: FormGroup
  lesson$!: Observable<Lesson>
  constructor(private fb: FormBuilder,  private lessonService: LessonService) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  } 
  ngOnInit(): void {
    this.lesson$ = this.lessonService.getLessonById(this.courseId.toString(),this.lessonId.toString());
    this.lesson$.subscribe((lesson: Lesson) => {
      this.updateForm = this.fb.group({
        title: [lesson.title, Validators.required],
        content: [lesson.content, Validators.required],
      })
    })
  }
  updateLesson(){
    if(this.updateForm.valid){
      const updateLesson:Lesson={
        id: this.lessonId,
        title: this.updateForm.value.title,
        content: this.updateForm.value.content,
        courseId: this.courseId
      }
      this.lessonService.updateLesson(this.courseId.toString(),updateLesson).subscribe({next:() => {
        console.log('Lesson updated successfully');
        this.updateLessonEvent.emit();
      }, error:(error) => {
        console.log('Error updating lesson:', error);    
      }});
    }
  }
}
