import { Test, TestingModule } from '@nestjs/testing';
import { EventListingsService } from './event-listings.service';

describe('EventListingsService', () => {
  let service: EventListingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventListingsService],
    }).compile();

    service = module.get<EventListingsService>(EventListingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
