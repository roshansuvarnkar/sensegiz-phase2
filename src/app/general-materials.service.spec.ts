import { TestBed } from '@angular/core/testing';

import { GeneralMaterialsService } from './general-materials.service';

describe('GeneralMaterialsService', () => {
  let service: GeneralMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
