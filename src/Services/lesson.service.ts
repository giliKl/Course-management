import { Injectable } from '@angular/core';
import { Lesson } from '../Models/lesson';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/api/courses';
  constructor(private http: HttpClient) { }
    private lessonsBehaviorSubject = new BehaviorSubject<Lesson[]>([]);
    public lessons$: Observable<Lesson[]> = this.lessonsBehaviorSubject.asObservable();

  // Get all lessons in a course
  getLessons(courseId: number):void {
    this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`).subscribe(
          (lessons) => {
            this.lessonsBehaviorSubject.next(lessons);
            console.log(this.lessons$);
          },
          (error) => alert('Error:' + error.message)
        );;
  }

  getLessonById(courseId: string, lessonId: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }
  addLesson(courseId: string, lesson: Lesson): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lesson);
  }
  updateLesson(courseId: string, lesson: Lesson): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lesson.id}`, lesson);
  }
  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`)
  }
}

