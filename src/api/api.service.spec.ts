import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpService } from "@nestjs/axios";
import { HttpServiceMock } from "../mocks/http.service.mock";
import { of } from "rxjs";
import { Team, TeamResponse } from "../objects/Team";
import { AxiosResponse } from 'axios'

// jest.mock('../mocks/http.service.mock');
// jest.mock('HttpService');

describe('ApiService', () => {
  let service: ApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        // HttpService
        {provide: HttpService, useClass: HttpServiceMock}
      ],
    }).compile();

    service = module.get<ApiService>(ApiService);
    // catsService = moduleRef.get<CatsService>(CatsService);
    httpService = module.get<HttpService>(HttpService);
    // httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('getNumberOfPagesForTeams should return observable of number', () => {
    const teamResponse: TeamResponse = new TeamResponse();
    teamResponse.pageTotal = 999;
    const response: any = {
      data: teamResponse,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'get').mockReturnValue(of(response));
    // HttpService.get.mockResolvedValue();
    // jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
    service.getNumberOfPagesForTeams().subscribe(res => {
      expect(res).toEqual(999);
    })
  })
  
  it('getTeamsForPageFromApi should return an observable of Team[]', () => {
    const teams: Team[] = [];
    for (let i = 0; i < 100; i++) {
      const t: Team = new Team().generateMockTeam(i);
      teams.push(t);
    }
    
    const teamResponse: TeamResponse = new TeamResponse();
    teamResponse.teams = teams;
  
    const response: any = {
      data: teamResponse,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };
  
    jest.spyOn(httpService, 'get').mockReturnValue(of(response));
    service.getTeamsForPageFromApi(1).subscribe(team => {
      expect(teams.length).toEqual(100);
    });
  })
 
  it('getTeams should return an observable of Team[]', () => {
    const numberOfPages = 10;
    const numberOfTeams = 5;
    jest.spyOn(service, 'getNumberOfPagesForTeams').mockReturnValue(of(numberOfPages));
    const teams: Team[] = [];
    for (let i = 0; i < numberOfTeams; i++) {
      const t: Team = new Team().generateMockTeam(i);
      teams.push(t);
    }
    jest.spyOn(service, 'getTeamsForPageFromApi').mockReturnValue(of(teams));
    service.getTeams().subscribe(teams => {
      expect(teams.length).toEqual(numberOfTeams * numberOfPages);
    });
  })
  
});
