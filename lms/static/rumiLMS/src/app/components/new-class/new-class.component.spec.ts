import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewClassComponent } from './new-class.component';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';

import { ClassApiService } from '../../services/class/class-api.service';

fdescribe('NewClassComponent', () => {
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

    // Create and pass in a dynamic FormBuilder-based Reactive Form 
    component.newClassForm = formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
    });

    spyOn(component, 'ngOnInit');
    spyOn(component, 'onSubmit');
    spyOn(component, 'createNewClass')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined #newClassForm obj', () => {
    expect(component.newClassForm).toBeTruthy();
  });

  it('should call #ngOnInit() once', () => {
    //component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalledTimes(1);
  });
});
