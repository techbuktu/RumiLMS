import { Component, OnInit } from '@angular/core';
import { ClassApiService } from '../../services/class/class-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  constructor(private router: Router, private classService:ClassApiService) { }

  class_list: any = [];
  class_api_error_message:string;
  class_deletion_success_message:string;


  ngOnInit() {
    this.getClasses();
  }

  getClasses(){
    this.classService.getAllClasses().subscribe(
      data => {
        this.class_list = data;
        console.log('ALL CLASSES: ', this.class_list);
      },
      err => {},
      () => {}
    )
  }
  deleteClass(class_data){
    this.classService.deleteClass(class_data.link).subscribe(
      data => {
        this.class_deletion_success_message = class_data.name + ' was successfully removed rom the syllabus.';
      },
      error => {
        this.class_api_error_message = "Sorry, something went wrong. Please, try again later.";
      },
      () => {
        // Fetch and reload new list of classes which shouldn't contain the deleted class.
        this.getClasses();
      }
    )
  }

  gotoHomePage(): void{
    this.router.navigate([''])
  }

}


