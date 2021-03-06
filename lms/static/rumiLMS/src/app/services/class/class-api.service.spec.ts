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
          'http://localhost:8000/api/students/avia-one',
          'http://localhost:8000/api/students/betty-two'
        ]
      }
    ];

    //1. Make an API request for all classes
    apiService.getAllClasses().subscribe(
      res => {
        expect(res).toEqual(mockClassList);
      }
    );

    const req = httpTestingController.expectOne(apiService.ApiUrl);

    expect(req.request.method).toEqual('GET');
    
    req.flush(mockClassList);

  });

  it('can return a single class using getClassByUrl()', () => {
    const mockSingleClass = {
      name: 'Astronomy',
      desc: 'This is about the study of the planetary bodies.',
      link: 'astronomy',
      students : [
        'http://localhost:8000/api/students/muhammad-jalloh',
        'http://localhost:8000/api/students/avia-weinstein'
      ]
    };
    // Mock an API call to get a class by its 'link' attribute 
    apiService.getClassByUrl('astronomy').subscribe(
      res => {
        expect(res).toEqual(mockSingleClass);
        expect(res.link).toEqual(mockSingleClass.link);
      }
    );

    const req = httpTestingController.expectOne(apiService.ApiUrl + 'astronomy');

    expect(req.request.method).toEqual('GET');


    req.flush(mockSingleClass);

  });

  it('can create a new class instance with its addNewClass()', () => {
    const mockNewClass = {
      name: 'Classical Poetry',
      desc : 'This class explores the classic poetic works of Shakespeare, Umrul Qays and Rumi',
      link: '',
      students: []
    };

    apiService.addNewClass(JSON.stringify(mockNewClass))
    .subscribe( res => {
      expect(res).toEqual(mockNewClass);
    });

    const req = httpTestingController.expectOne(apiService.ApiUrl);
    expect(req.request.method).toBe('POST');

    req.flush(mockNewClass);
  });

  it('can update the properties of a class using updateClass()', () => {

    //1: First: Simulate creating a new class object 
    //May have as well just simulated 'GETting' an existing class from the API
    // Either one works for this purpose.
    const originalClass = {
      name: 'Original',
      desc: 'This is the ORIGINAL state of this class.',
      link: 'original',
      students: []
    };

    //2: Check that the new Class has been succesfully-POSTed
    apiService.addNewClass(originalClass).subscribe(
      res => {
        expect(res).toEqual(originalClass);
      }
    );

    const post_req = httpTestingController.expectOne(apiService.ApiUrl);
    expect(post_req.request.method).toEqual('POST');
    post_req.flush(originalClass);

    httpTestingController.verify();

    //3: Now, update the originalClass using a PUT request to the API
    // with the updated form of the Class

    const updatedClass = {
      name: 'Original',
      desc: 'This is the UPDATED DESCRIPTION of this class.',
      link: 'original',
      students: [
        'http://localhost:8000/api/students/muhammad-jalloh'
      ]
    };

    apiService.updateClass(originalClass.link, updatedClass).subscribe(
      res => {
        expect(res).toBe(updatedClass);
        expect(res.link).toMatch(originalClass.link);
      }
    );

    const put_request = httpTestingController.expectOne(apiService.ApiUrl + updatedClass.link+'/');
    expect(put_request.request.url.match(apiService.ApiUrl+'original/'));

    expect(put_request.request.method).toEqual('PUT');

    put_request.flush(updatedClass);

  });

  it('can remove a class instance using its deleteClass() method', () =>{
    let targetClassUrl = 'testronics';

    apiService.deleteClass(targetClassUrl)
    .subscribe(
      res => {
        expect(res).toBeNull();
      }
    );

    const req = httpTestingController.expectOne(apiService.ApiUrl+targetClassUrl);

    expect(req.request.method).toBe('DELETE');

    req.flush("");
  });

  it('should be able to retrieve a class item using its Full API URL by calling its getClassByFullUrl()', () =>{
    const mockClassItem = {
      name: 'Frontend Testing',
      desc: 'This class covers the delicate art and science of TDD and BDD using Angular.',
      link: 'frontend-testing',
      students: [
        'http://localhost:8000/api/students/muhammad-jalloh',
        'http://localhost:8000/api/students/avia-weinstein'
      ]
    };

    apiService.getClassByFullUrl('http://localhost:8000/api/classes/frontend-testing/')
    .subscribe(
      res => {
        expect(res).toEqual(mockClassItem);
      }
    );

    const req = httpTestingController.expectOne('http://localhost:8000/api/classes/frontend-testing/');

    //Check that the resulting API Http Request method was a 'GET'
    expect(req.request.method).toBe('GET');

    // Provide the (test replacement) mockClassItem that should reflect what was on the server
    // and sent back as a response in a live ClassApiService.getClassByFullUrl()
    req.flush(mockClassItem);

  });

});
