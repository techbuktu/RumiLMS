import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewStudentComponent } from './new-student.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { StudentApiService }  from '../../services/student/student-api.service';

describe('NewStudentComponent', () => {
  let component: NewStudentComponent;
  let fixture: ComponentFixture<NewStudentComponent>;
  const formBuilder: FormBuilder = new FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ NewStudentComponent ],
      providers: [StudentApiService, 
      {
        provide: FormBuilder, useValue: formBuilder
      }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudentComponent);
    component = fixture.componentInstance;
    component.newStudentForm = formBuilder.group({
      first_name : ['', Validators.required],
      last_name: ['', Validators.required],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
