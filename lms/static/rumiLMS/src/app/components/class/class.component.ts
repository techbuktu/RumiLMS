import { Component, OnInit } from '@angular/core';
import { ClassApiService } from '../../services/class/class-api.service';
import { StudentApiService } from '../../services/student/student-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classUrl:string;
  class_data:Object;
  get_class_error_message:string;
  students_in_class: Object[];
  student_list_error_message:string;
  class_update_error_message:string;
  class_update_success_message:string;
  UrlsforStudents: string[];

  constructor(private classService:ClassApiService, private studentService:StudentApiService, private router: Router, private route:ActivatedRoute) {
    this.route.params.subscribe(
      params => {
        this.classUrl = params.classUrl;
      },
      err => {
        this.router.navigate(['/classes']);
      }
    )
   }

  ngOnInit() {
    this.getClassDetails();

  }

  getClassDetails(){
    this.classService.getClassbyUrl(this.classUrl)
    .subscribe(
      res => {
        this.class_data = res;
        this.UrlsforStudents = this.class_data.students;
        console.log("UrlforStudents => ", this.UrlsforStudents);
        this.getStudentsinClass();
      },
      err => {
        this.get_class_error_message = "Sorry, this class does not exist. Please, check and try again.";
      },
      () => {}
    )
}

getStudentsinClass(){
  const students: Object[] = [];
  this.UrlsforStudents.forEach(url => {
    this.studentService.getStudentbyFullUrl(url).subscribe(
      res => {
        students.push(res);
      },
      err => {
        this.student_list_error_message = "Sorry, no students are enrolled in this class.";
      },
      () => {}
    )
  })

  this.students_in_class = students;
  
}


gotoClassesHomePage(): void{
  this.router.navigate(['/classes']);
}




}
