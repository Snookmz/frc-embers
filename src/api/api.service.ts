import { Injectable } from '@nestjs/common';
import { BehaviorSubject, combineLatest, defer, map, mergeMap, Observable } from "rxjs";
import { Team, TeamResponse } from "../objects/Team";
import { HttpService } from "@nestjs/axios";

/*
const baseUrl = 'https://frc-api.firstinspires.org/v3.0';
const authCode = 'Basic bXNub2VrOjE2NGRhNjUxLTRlZGUtNGZiYi1hOTQ5LTc4ZWEwMTMyMDM0Ng==';

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = authCode;
 */

@Injectable()
export class ApiService {

  private _teamsAnnounced: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  public readonly teamsAnnounced$: Observable<Team[]> = this._teamsAnnounced.asObservable();

  private authorizationCode = 'Basic ';
  private baseUrl = 'https://frc-api.firstinspires.org/v3.0';
  private eventListingsUrl = '/2023/events';
  private teamListingsUrl = '/2023/teams';

  private teams: Team[] = [];

  constructor(
    private readonly httpService: HttpService
  ) {
    // this.axios.defaults.baseURL = baseUrl;
    // this.axios.defaults.headers.common['Authorization'] = authCode;
  }

  set authCode(authorizationCode: string) {
    this.authorizationCode = authorizationCode;
  }
  
  /**
   *
   * @param limitCalls
   *
   * limitCalls limits the number of team pages we get. Useful for testing
   */
  public getTeams(limitCalls?: number ): Observable<Team[]> {
    console.log('ApiService, getTeams');
    return this.getNumberOfPagesForTeams().pipe(mergeMap(totalPages => {
      // console.log('---------- getNumberOfPagesForTeams: ', totalPages);
      limitCalls = limitCalls ? limitCalls : totalPages;
      const requests$: Observable<Team[]>[] = []
      for (let i = 1; i <= limitCalls; i++) {
        requests$.push(this.getTeamsForPageFromApi(i))
      }
      return combineLatest(requests$).pipe(map(arrayOfArrayOfTeams => {
        // console.log('arrayOfArrayOfTeams: ', arrayOfArrayOfTeams);
        // console.log('----------- arrayOfArrayOfTeams.length: ', arrayOfArrayOfTeams.length);
        const teams: Team[] = [];
        if (arrayOfArrayOfTeams && arrayOfArrayOfTeams.length > 0) {
          arrayOfArrayOfTeams.forEach(tms => {
            // console.log('--------------- tms:', tms);
            teams.push(...tms);
          })
        }
        return teams;
      }));
    }))
  }
 
  /*
  
  ORIGINAL before turned into Observable
  
  public getTeams(limitCalls?: number ): void {
    console.log('ApiService, getTeams');
    this.getNumberOfPagesForTeams().subscribe(totalPages => {
      // console.log('--------- total pages: ', totalPages);

      // if we have limitCalls then use that value, otherwise we'll get all the pages (totalPages)
      limitCalls = limitCalls ? limitCalls : totalPages;
      
      const requests$: Observable<Team[]>[] = []
      for (let i = 1; i <= limitCalls; i++) {
        requests$.push(this.getTeamsForPageFromApi(i))
      }
      const combined$ = combineLatest(requests$);
      combined$.subscribe(res => {
        console.log('---------- combined result res: ', res);
        debugger;
      }, err => {
        console.error('--------- error from combinedLatest request: ', err);
      })
    })
  }
 
   */
 
  public getNumberOfPagesForTeams(): Observable<number> {
    return this.httpService.get(this.baseUrl + this.teamListingsUrl, {headers: {Authorization: this.authorizationCode}}).pipe(map(res => {
      // console.log('----------- getNumberOfPagesForTeams res: ', res);
      const teamResponse: TeamResponse = res.data;
      // console.log('---- teamResponse: ', teamResponse);
      console.log('getNumberOfPagesForTeams, pages: ', teamResponse.pageTotal);
      return teamResponse.pageTotal;
    }))
  }

  /*
  private getNumberOfPagesForTeamsOLD(): Observable<number> {
    const getPages$ = defer(() => axios.get(this.teamListingsUrl));
    // const getPages$ = defer(() => axios.get(this.teamListingsUrl));
    return getPages$.pipe(map(res => {
      // console.log('----------- res: ', res.data);
      const teamResponse: TeamResponse = res.data;
      // console.log('teamCountTotal: ', teamResponse.teamCountTotal);
      console.log('getNumberOfPagesForTeams, pages: ', teamResponse.pageTotal);
      return teamResponse.pageTotal;
    }))
  }
   */
  
  /**
   *
   * @param page
   *
   * Gets the teams (Team[]) for the page supplied.
   */
  public getTeamsForPageFromApi(page: number): Observable<Team[]> {
    return this.httpService.get(this.baseUrl + this.teamListingsUrl + '?page='+page, {headers: {Authorization: this.authorizationCode}}).pipe(map(res => {
      // console.log('getTeamsForPageFromApi result: ', res);
      const teamResponse: TeamResponse = res.data;
      return teamResponse.teams;
    }))
  }

  

  private printTeams(teams: Team[]): void {
    teams.forEach(team => {
      console.log('Name: ', team.nameShort);
      console.log('Number: ', team.teamNumber);
      console.log('\n');
    })
  }

  public convertDateToString(date: Date): string {
    let dateStr = '';

    let month = date.getMonth();
    month++ // month starts from 0

    let monthAsString = `${month}`
    if (month < 10) {
      monthAsString = `0${monthAsString}`;
    }
    let day = date.getDate();
    let dayAsString = `${day}`;
    if (day < 10) {
      dayAsString = `0${dayAsString}`;
    }

    dateStr = `${date.getFullYear()}-${monthAsString}-${dayAsString}`;

    return dateStr;
  }


}
