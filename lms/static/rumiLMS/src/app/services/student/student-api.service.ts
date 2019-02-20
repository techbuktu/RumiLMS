import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {
  ApiUrl: string = 'http://localhost:8000/api/students/';

  constructor(private Http: HttpClient) { 

  }

  getAllStudents(){
    return this.Http.get(this.ApiUrl);
  }

  getStudentbyUrl(student_url:string){
    return this.Http.get(this.ApiUrl + student_url);
  }

  getStudentbyFullUrl(full_url:string){
    return this.Http.get(full_url);
  }
  
  addStudent(student_data:any) {
    return this.Http.post(this.ApiUrl, student_data);
  }

  updateStudent(student_url:string, updated_student_data:any){
    return this.Http.put(this.ApiUrl + student_url, updated_student_data);
  }

  deleteStudent(student_url:string){
    return this.Http.delete(this.ApiUrl + student_url);
  }

}
