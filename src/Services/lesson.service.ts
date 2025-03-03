import { Injectable } from '@angular/core';
import { Lesson } from '../Models/lesson';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/Lesson';
  constructor(private http: HttpClient) { }

  // Get all lessons in a course
  getLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`);
  }

  getLessonById(courseId: string, lessonId: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }
}

