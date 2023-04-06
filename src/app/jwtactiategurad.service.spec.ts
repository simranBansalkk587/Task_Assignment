import { TestBed } from '@angular/core/testing';

import { JwtactiveguradService } from './jwtactivegurad.service';

describe('JwtactiveguradService', () => {
  let service: JwtactiveguradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtactiveguradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
