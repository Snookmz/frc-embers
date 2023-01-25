import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpService } from "@nestjs/axios";
import { HttpServiceMock } from "../mocks/http.service.mock";

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        {provide: HttpService, useClass: HttpServiceMock}
      ],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
