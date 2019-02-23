import { Component, OnInit } from '@angular/core';
import { ClassApiService } from '../../services/class/class-api.service';
import { StudentApiService } from '../../services/student/student-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classUrl:string;
  class_data:any;
  get_class_error_message:string;
  students_in_class: Object[];
  student_list_error_message:string;
  class_delete_success_message: string;
  class_delete_error_message:string;
  UrlsforStudents: string[];

  updateClassForm: FormGroup;
  updatedClass;
  show_update_form: boolean = false;
  form_is_submitted: boolean = false;
  class_update_api_successful: boolean;
  class_update_success_message: string;
  class_update_error_message:string;




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

    //Initialize the updatedClassForm
    this.updateClassForm = new FormGroup({
      name: new FormControl(''),
      desc: new FormControl(''),
    });

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

openUpdateForm(){
  this.show_update_form = true;
}

updateClassDetails(){
  this.form_is_submitted = true;

  let name:string;
  let desc: string;

  //1: Update Class Data
  if(this.updateClassForm.controls.name.dirty){
    name = this.updateClassForm.controls.name.value
  }

  else{
    name = this.class_data.name
  }

  if(this.updateClassForm.controls.desc.dirty){
    desc = this.updateClassForm.controls.desc.value;
  }
  else{
    desc = this.class_data.desc;
  }

  //Build this.updatedClass from initial this.class_data and/or with any new values from this.updateClassForm
  this.updatedClass = {
    name: name,
    desc: desc,
    link: this.class_data.link,
    students: this.class_data.students
  };
  //2: PUT updated_class to API
  this.classService.updateClass(this.classUrl, this.updatedClass)
  .subscribe(
    res => {
      this.class_update_api_successful = true;
      this.class_update_success_message = "Congrats, maestro! You have successfully updated the details about this class";
    },
    err => {
      this.class_update_error_message = "Sorry, something went wrong. Please, try again later.";
    },
    () => {
     
    }
  )
  //3: Fetch and reload updated_class data
}

deleteClass(){
  this.classService.deleteClass(this.classUrl)
  .subscribe(
    res => {
      this.class_delete_success_message = "This class was successfully-deleted from yur syllabus.";
      this.router.navigate(['/classes']);
    },
    err => {
      this.class_delete_error_message = "Something went wrong. This class could not be deleted. Please, try agian later.";
    },
    () => {}
  )
}


gotoClassesHomePage(): void{
  this.router.navigate(['/classes']);
}




}
