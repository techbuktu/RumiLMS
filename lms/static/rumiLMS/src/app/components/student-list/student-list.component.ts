import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  constructor(private studentService:StudentApiService, private router:Router) { }

  student_list: any;
  student_error_message: string; 

  ngOnInit() {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getAllStudents().subscribe(
      data => { 
        console.log(data);
        this.student_list = data;
      },
      err => {
        this.student_error_message = "Sorry, there was an error. Please, try again.";
      },
      () => {}
    )
  }

  toHomePage():void {
    this.router.navigate([''])
  }
}
