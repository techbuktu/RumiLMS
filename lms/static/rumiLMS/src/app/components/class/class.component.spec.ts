import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClassComponent } from './class.component';
//import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClassApiService } from '../../services/class/class-api.service';

import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';

describe('ClassComponent', () => {
  let component: ClassComponent;
  let fixture: ComponentFixture<ClassComponent>;

  let formBuilder: FormBuilder = new FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [ ClassApiService,
        // Add the FormBuilder to enable dynamic creation of Reactive Forms instances 
        // in this Test Suite 
        { provide: FormBuilder, useValue: formBuilder}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassComponent);
    component = fixture.componentInstance;
    //Create and pass in the updateClassForm dynamically 
    component.updateClassForm = formBuilder.group({
      name: new FormControl(''),
      desc: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
