import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewClassComponent } from './new-class.component';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';

import { ClassApiService } from '../../services/class/class-api.service';

describe('NewClassComponent', () => {
  let component: NewClassComponent;
  let fixture: ComponentFixture<NewClassComponent>;
  let formBuilder: FormBuilder = new FormBuilder;
  let newClassForm: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClassComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        ClassApiService,
        { provide: FormBuilder, useValue: formBuilder}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClassComponent);
    component = fixture.componentInstance;
    component.classService = new ClassApiService;

    // Create and pass in a dynamic FormBuilder-based Reactive Form 
    component.newClassForm = formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
    });

    spyOn(component, 'ngOnInit');
    spyOn(component, 'onSubmit');
    spyOn(component, 'createNewClass')
    spyOn(component.classService, 'addNewClass');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined #newClassForm obj', () => {
    expect(component.newClassForm).toBeTruthy();
  });

  it('should call #ngOnInit() once', () => {
    expect(component.ngOnInit).toHaveBeenCalledTimes(1);
  });

  it('should have the #newClassForm instantianted upon NewClassComponent initialization', () => {
    expect(component.newClassForm).toBeDefined();
  });

  it('should have the API-related variables properly initialized', () => {
    expect(component.api_post_fail_message).toEqual("");
    expect(component.api_post_successful).toBeFalsy();
  });

  it('should initialize the form-related variables', () => {
    expect(component.is_submitted).toBeFalsy();
    expect(component.form_is_valid).toBe(false);
  });

  it('should handle processing #newClassForm data', () => {
    expect(component.is_submitted).toBeFalsy();
    expect(component.newClassData).toBeFalsy();

    component.newClassForm.setValue({
      name: 'Testology', 
      desc: 'This class is about TDD, BDD and other variant thereof. Hop on the Test-wagon! :)'
    });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    component.newClassData = component.newClassForm.value;
    expect(component.newClassData).toBeDefined();
    expect(component.newClassForm.valid).toBe(true);
    component.createNewClass()
    expect(component.createNewClass).toHaveBeenCalled();
    expect(component.classService).toBeTruthy();
    component.classService.addNewClass(component.newClassData);
    expect(component.classService.addNewClass).toHaveBeenCalledTimes(1);
    
  });

});


