import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentApiService } from './student-api.service';

describe('StudentApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [StudentApiService]
  }));

  it('should be created', () => {
    const service: StudentApiService = TestBed.get(StudentApiService);
    expect(service).toBeTruthy();
  });
});
