import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../Models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

 
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  // GET all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
    
  }

  // GET course by ID
  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // POST create new course (for teachers)
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // PUT update course by ID (for teachers)
  // PUT update course by ID (for teachers)
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  // DELETE course by ID (for teachers)
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  enroll(courseId: number,userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, userId);
  }
}