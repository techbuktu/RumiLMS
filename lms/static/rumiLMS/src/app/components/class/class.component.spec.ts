import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClassComponent } from './class.component';
//import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClassApiService } from '../../services/class/class-api.service';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';

xdescribe('ClassComponent', () => {
  let component: ClassComponent;
  let fixture: ComponentFixture<ClassComponent>;
  let formBuilder: FormBuilder = new FormBuilder;
  //let formGroup: FormGroup = new FormGroup;
  let updateClassForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl(''),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [ ClassApiService,
        // Add the FormBuilder to enable dynamic creation of Reactive Forms instances 
        // in this Test Suite 
        { provide: FormBuilder, useValue: formBuilder},
        //{ provide: FormGroup, useValue: formGroup}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassComponent);
    component = fixture.componentInstance;
    //Create and pass in the updateClassForm dynamically 
    component.updateClassForm = updateClassForm;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
