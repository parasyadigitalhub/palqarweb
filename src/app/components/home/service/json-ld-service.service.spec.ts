import { TestBed } from '@angular/core/testing';

import { JsonLdServiceService } from './json-ld-service.service';

describe('JsonLdServiceService', () => {
  let service: JsonLdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonLdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
