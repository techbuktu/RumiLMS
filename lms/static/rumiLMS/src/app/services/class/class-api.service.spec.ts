import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClassApiService } from './class-api.service';

describe('ClassApiService', () => {

  let apiService: ClassApiService;
  let httpTestingController: HttpTestingController;
  let Http: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ ClassApiService, HttpClient ]
  }));

  beforeEach(() => {
    //Inject the ClassApiService and HttpTestingController for mocking Http Request/Response 
    apiService = TestBed.get(ClassApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach( () => {
     //Check that there are no other Http API requests left
     httpTestingController.verify();
  });

  it('should be created', () => {
    //const service: ClassApiService = TestBed.get(ClassApiService);
    expect(apiService).toBeTruthy();
  });

  xit('has an instance of HttpClient', () => {
    expect(apiService.Http).toBe(Http);
  });

  it('defines an ApiUrl attribute', () => {
    expect(apiService.ApiUrl).toBeDefined();
  });

  it('can perform getAllClasses()', () => {
    const mockClassList = [
      {
        name: 'Anatomy',
        desc: 'A study of the human body.',
        link: 'anatomy',
        students: [] // No students currently registered for this class.
      },
      {
        name: 'Biology',
        desc: 'This is a study of living things on land, in the waters below and the air above and beyond the rainbow.',
        link: 'biology',
        students: [
          'http://rumilms.com/api/students/avia-one',
          'http://rumilsm.com/api/students/betty-two'
        ]
      }
    ];

    //1. Make an API request for all classes
    apiService.getAllClasses().subscribe(res => 
      expect(res).toEqual(mockClassList);
    );

    const req = httpTestingController.expectOne(apiService.ApiUrl);

    expect(req.request.method).toEqual('GET');
    
    req.flush(mockClassList);

  });

  it('can return a single class using getClassByUrl()', () => {

  });

  it('can create a new class instance with its addNewClass()', () => {

  });

  it('can update the properties of a class using updateClass()', () => {

  });

  it('can remove a class instance using its deleteClass() method', () =>{

  });

});
