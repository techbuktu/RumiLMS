import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student-api.service';
import { ClassApiService } from '../../services/class/class-api.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
  
  //Initialize form-related Objects here
  newStudentForm: FormGroup;
  newStudent;
  is_submitted:boolean = false;
  api_post_successfull:boolean = false;
  api_post_fail_message:string;
  form_is_valid:boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private studentService: StudentApiService) { }

  ngOnInit() {
    //Create the newStudentForm to  have fields matching Student Object
    this.newStudentForm = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name: ['', Validators.required],
      //Student.link serves as the "primary key" field to call the API endpoints
      // and is always automatically-set in the backend, so, it is left out here.

    })
  }

  onSubmit(){
    this.is_submitted = true;

    if (this.newStudentForm.invalid){
      return;
    }
     this.newStudent = {
      first_name: this.newStudentForm.controls.first_name.value,
      last_name: this.newStudentForm.controls.last_name.value
    }

    console.log("JSON.stringify(this.newStudent): ", JSON.stringify(this.newStudent));

    this.addNewStudent();
  }

  addNewStudent(){
    this.studentService.addStudent(JSON.stringify(this.newStudent))
    .subscribe(
      res => {
        this.form_is_valid = true;
        this.api_post_successfull = true;
        this.router.navigate(['/students']);
      },
      err => {
        this.api_post_successfull = false;
        this.api_post_fail_message = "Sorry, this student could not be added. Please, try again later.";
      },
      () => {
        console.log("studentService.addNewStudent() finished running.");
      }
    )
  }

  viewAllStudents():void{
    this.router.navigate(['/students']);
  }

}
