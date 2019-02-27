import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentApiService } from '../../services/student/student-api.service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  //let studentService = component.studentService;
  //let classService = component.classService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [StudentApiService, FormGroup],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have a #/studenturl attribute', () => {
    let studentUrl = component.studentUrl;
    expect(studentUrl).toBeDefined();
  });

  xit("should have a 'student' obj", () => {
    expect(component.student).toBe(true);
  });

  xit("should have a 'UrlsforClasses' array", () => {
    expect(component.UrlsforClasses).toBeTruthy();
  });

  xit('should have an #updatedStudent object', () =>{

  });

  xit('should have an #updated_class_list array', () => {

  });

  xit('should have an #updatedStudentForm Reactive Form', () => {

  });

  xit('the #show_updated_form bool should be functional', () => {

  });

  xit('should have an #updatedStudent object that changes states', () => {

  });

  xit('should have the component.ngOnInit() functions correctly', () => {

  });

  xit('should make sure that the #getStudentData() methods works accordingly', () =>{

  });

  xit('#getClassNames() works as expected', () => {

  });

  xit('#getClassesforStudent() calls next methods as expected', () => {

  });

  xit('should have the #getClassbyFullUrl() call needed methods', () => {

  });

  xit('should check that the logic of updating a student data works as expected', () => {

  });

  xit('should have the #deleteStudent() work and update the component as needed', () => {

  });

});
