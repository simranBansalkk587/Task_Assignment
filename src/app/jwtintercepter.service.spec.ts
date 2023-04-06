import { TestBed } from '@angular/core/testing';

import { JWTintercepterService } from './jwtintercepter.service';

describe('JWTintercepterService', () => {
  let service: JWTintercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTintercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
