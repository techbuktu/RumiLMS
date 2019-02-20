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
  student_deletion_error_message: string; 
  student_deletion_success_message: string;
  student_list_error_message:string;

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
        this.student_list_error_message = "Sorry, there was an error. Please, try again.";
      },
      () => {}
    )
  }

  deleteStudent(student_data){
    this.studentService.deleteStudent(student_data.link).subscribe(
      res => {
        this.student_deletion_success_message = student_data.first_name + ' was sucessfully removed.';
      },
      err => {
        this.student_deletion_error_message = student_data.first_name + ' could not be deleted. Please, try again later.';
      },
      () => {
        //Either clas the API service and reload the current list of student minus the deleted one.
        this.getStudents();
      }

    )
  }

  toHomePage():void {
    this.router.navigate([''])
  }
}
