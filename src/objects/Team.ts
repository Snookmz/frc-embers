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
  
  public generateMockTeam(teamNumber?: number): Team {
    const t: Team = new Team();
    teamNumber = teamNumber != undefined ? teamNumber : 1;
    t.teamNumber = teamNumber;
    t.nameFull = `team name full #${teamNumber}`;
    t.nameShort = `teamName${teamNumber}`;
    t.city = `city#${teamNumber}`;
    t.stateProv = `state#${teamNumber}`;
    t.country = `country#${teamNumber}`;
    t.rookieYear = `rookieYear#${teamNumber}`;
    t.robotName = `robotName#${teamNumber}`;
    t.districtCode = `districtCode#${teamNumber}`;
    t.schoolName = `schoolName#${teamNumber}`;
    t.website = `website#${teamNumber}`;
    t.homeCPM = `homeCPM#${teamNumber}`;
    
    return t;
  }

}
