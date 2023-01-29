import { Test, TestingModule } from '@nestjs/testing';
import { DistrictListingsService } from './district-listings.service';

describe('DistrictListingsService', () => {
  let service: DistrictListingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistrictListingsService],
    }).compile();

    service = module.get<DistrictListingsService>(DistrictListingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
