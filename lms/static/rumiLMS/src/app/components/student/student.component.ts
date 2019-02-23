import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student-api.service';
import { ClassApiService } from '../../services/class/class-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


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
  student_class_list:Object[];
  classes_error_message:string;
  student_delete_error_message: string;
  student_delete_success_message: string;
  class_data:any;

  updateStudentForm: FormGroup;
  updatedStudent;
  show_update_form: boolean = false;
  form_is_submitted:boolean = false;
  student_update_api_successful: boolean = false;
  student_update_success_message: string;
  student_update_error_message: string;


  constructor(private studentService:StudentApiService, private classService: ClassApiService, private router:Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(
      params => {
        this.studentUrl = params.studentUrl;
      },
      err => {
        this.student_error_message = "This Student does not exist.";
      },
      () => {}
    )
  }

  ngOnInit() {
    this.getStudentData();
    this.getTestClass();

    //Initialize the updateStudentForm 
   this.updateStudentForm = new FormGroup({
    first_name : new FormControl(''),
    last_name : new FormControl(''),
   });

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
    let class_names: Array<string> = [];
    let url_parts: any;
    let class_name:string;
    let urlString:string;

    this.UrlsforClasses.forEach(url => {
      urlString = url;
      url_parts = urlString.split('/');
      class_name = url_parts[5];
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
      err => {
        this.student_error_message = "This student does not exist. Redirecting ...";
        this.router.navigate(['/students']);
      },
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

  openUpdateForm(){
    this.show_update_form = true;
    this.router.navigate(['/students', this.studentUrl]);
  }

  updateStudent(){
    this.form_is_submitted = true;

    let first_name: string;
    let last_name: string;

    //1: Update Student  Data
    if (this.updateStudentForm.controls.first_name.dirty) {
      first_name = this.updateStudentForm.controls.first_name.value;
    }

    else {
      first_name = this.student.first_name;
    }

    if (this.updateStudentForm.controls.last_name.dirty) {
      last_name = this.updateStudentForm.controls.last_name.value;
    }

    else{
      last_name = this.student.last_name;
    }

    // Populate an Object with the updated student data: this.updatedStudent
    this.updatedStudent = {
      first_name: first_name,
      last_name: last_name,
      link: this.student.link,
      classes: this.student.classes
    };
    console.log("this.updatedStudent ", this.updatedStudent); 
    //2: PUT updated_student to API
    this.studentService.updateStudent(this.studentUrl, JSON.stringify(this.updatedStudent))
    .subscribe(
      res => {
        this.student_update_api_successful = true;
        this.student_update_success_message = "You have successfully-updated ", this.student.first_name + "'s info.";

      },
      err => {
        console.log("API ERROR MSG: ", err);
        this.student_update_error_message = "Sorry, this student's info could not be updated. Please, try again later.";

      },
      () => {
        this.router.navigate(['/students', this.studentUrl]);
      }
    )
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
