import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student-api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentUrl:string;
  student_error_message: string;
  student:any;
  student_class_list:any;
  constructor(private studentService:StudentApiService, private router:Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(
      params => {
        this.studentUrl = params.studentUrl;
      },
      err => {
        this.student_error_message = "This Student does not exist."
      },
      () => {}
    )
  }

  ngOnInit() {
    this.getStudentData();
    //this.getClassesforStudent();
  }


  getStudentData(){
    this.studentService.getStudentbyUrl(this.studentUrl).subscribe(
      data => {
        this.student = data;
        this.student_class_list = this.student['classes'];
      },
      err => {},
      () => { }
    )
  }

  //getClassesforStudent(){}

}
