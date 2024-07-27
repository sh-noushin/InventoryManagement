import { TestBed } from '@angular/core/testing';

import { ItemFacadeService } from './item-facade.service';

describe('ItemFacadeService', () => {
  let service: ItemFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
