import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student-api.service';
import { ClassApiService } from '../../services/class/class-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentUrl:string;
  student_error_message: string;
  student:any;
  UrlsforClasses:[];
  class_names:Array<string>;
  student_class_list:any[];
  classes_error_message:string;
  class_data:any;
  constructor(private studentService:StudentApiService, private classService: ClassApiService, private router:Router, private route: ActivatedRoute) { 
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
    this.getTestClass();
    //this.getClassesforStudent();

  }

  getTestClass(){
    return this.classService.getClassbyFullUrl("http://localhost:8000/api/classes/anatomy/").subscribe(
      data => {
        console.log("Test Class: ", data);
        this.student_class_list.push(data);
        console.log("Class List in getTestClass(): ", this.student_class_list);
      }
    )
  }

  getStudentData(){
    this.studentService.getStudentbyUrl(this.studentUrl).subscribe(
      data => {
        console.log(data);
        //console.log("Class URLs =:", data.classes);
        this.student = data;
        
        this.UrlsforClasses = this.student.classes;
        console.log("Class URLs are: ", this.UrlsforClasses);
        this.UrlsforClasses.forEach(url => {
          const url_parts = url.split('/');
          const class_name = url_parts[5];
          this.class_names.push(class_name);
        })
        console.log(this.class_names);
        
      },
      err => {},
      () => { }

    )
  }

  getClassData(url){
    this.classService.getClassbyFullUrl(url).subscribe(
      data => {
        this.class_data = data;
      },
      err => {
        console.log("Error with getClassData()");
      },
      () => {}
    )
  }

  getClassesforStudent(){
    return this.UrlsforClasses.forEach(url => {
      //this.getClassByFullUrl(url);
      this.classService.getClassbyFullUrl(url).subscribe(
        data => {
          this.student_class_list.push(data);
        },
        err => {
          this.classes_error_message = "Sorry, no classes found for this student.";
        },
        () => {}
      )
      console.log('Current Classes: ', this.student_class_list);
    })
    console.log("Class List: ", this.student_class_list);
    
  }

  

  getClassByFullUrl(fullUrl){
    this.classService.getClassbyFullUrl(fullUrl).subscribe(
      data => {
        this.student_class_list.push(data);
      },
      err => {
        this.classes_error_message = "Sorry, no classes found for this student.";
      },
      () => {}
    )
  }


}
