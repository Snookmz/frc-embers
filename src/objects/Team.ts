export class TeamResponse {
  teamCountTotal: number;
  teamCountPage: number;
  pageCurrent: number;
  pageTotal: number;
  teams: Team[];

  constructor() {
    this.teamCountTotal = 0;
    this.teamCountPage = 0;
    this.pageCurrent = 0;
    this.pageTotal = 0;
    this.teams = [];
  }
}

export class Team {
  teamNumber: number;
  nameFull: string;
  nameShort: string;
  city: string;
  stateProv: string;
  country: string;
  rookieYear: string;
  robotName: string;
  districtCode: string;
  schoolName: string;
  website: string;
  homeCPM: string;

  constructor() {
    this.teamNumber = 0;
    this.nameFull = '';
    this.nameShort = '';
    this.city = '';
    this.stateProv = '';
    this.country = '';
    this.rookieYear = '';
    this.robotName = '';
    this.districtCode = '';
    this.schoolName = '';
    this.website = '';
    this.homeCPM = '';
  }

}
