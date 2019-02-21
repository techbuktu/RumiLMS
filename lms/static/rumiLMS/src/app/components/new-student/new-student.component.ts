import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student-api.service';
import { ClassApiService } from '../../services/class/class-api.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
