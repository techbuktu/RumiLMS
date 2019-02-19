import { TestBed } from '@angular/core/testing';

import { ClassApiService } from './class-api.service';

describe('ClassApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassApiService = TestBed.get(ClassApiService);
    expect(service).toBeTruthy();
  });
});
