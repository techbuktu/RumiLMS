import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student-api.service';
import { ClassApiService } from '../../services/class/class-api.service';
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
  UrlsforClasses:[];
  updatedStudent;
  class_names:Array<string>;
  student_class_list:Object[];
  classes_error_message:string;
  student_delete_error_message: string;
  student_delete_success_message: string;
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

  getClassNames(){
    const class_names: Array<string> = [];
    this.UrlsforClasses.forEach(url => {
      const url_parts = url.split('/');
      const class_name = url_parts[5];
      class_names.push(class_name);
    });
    this.class_names = class_names;
    console.log("Class Names: ", this.class_names);
  }

  getStudentData(){
    this.studentService.getStudentbyUrl(this.studentUrl).subscribe(
      data => {
        console.log(data);
        //console.log("Class URLs =:", data.classes);
        this.student = data;
        
        this.UrlsforClasses = this.student.classes;
        console.log("Class URLs are: ", this.UrlsforClasses);
        this.getClassesforStudent();
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
    const classes: any[] = [];
    return this.UrlsforClasses.forEach(url => {
      //this.getClassByFullUrl(url);
      this.classService.getClassbyFullUrl(url).subscribe(
        data => {
          classes.push(data);
        console.log("Classes Data so far:", classes);
        },
        err => {
          this.classes_error_message = "Sorry, no classes found for this student.";
        },
        () => {}
      )
      console.log('Current Classes: ', classes);
      this.student_class_list = classes;

    })
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

  updateStudent(){
    //1: Update Student  Data
    //2: PUT updated_student to API
    //3: Fetch and reload updated_student data to component class and UI
    console.log("Updated Student: ", this.student.first_name);
  }

  deleteStudent(){
    this.studentService.deleteStudent(this.student.link)
    .subscribe(
      res => {
        this.student_delete_success_message = "This student was successfully removed from the LMS.";
        this.router.navigate(['/students']);
      },
      err => {
        this.student_delete_error_message = "This student could not beremoved. Please, check and try again later.";
      },
      () => {}
    )
  }



  goToStudentsHomePage(): void{
    this.router.navigate(['/students']);
  }


}
