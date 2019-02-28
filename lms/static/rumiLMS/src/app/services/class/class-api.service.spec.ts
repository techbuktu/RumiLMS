import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClassApiService } from './class-api.service';

describe('ClassApiService', () => {

  let classService: ClassApiService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ ClassApiService ]
  }));

  it('should be created', () => {
    const service: ClassApiService = TestBed.get(ClassApiService);
    expect(service).toBeTruthy();
  });
});
