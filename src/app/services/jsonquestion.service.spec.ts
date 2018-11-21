import { TestBed, inject } from '@angular/core/testing';

import { JsonquestionService } from './jsonquestion.service';

describe('JsonquestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonquestionService]
    });
  });

  it('should be created', inject([JsonquestionService], (service: JsonquestionService) => {
    expect(service).toBeTruthy();
  }));
});
