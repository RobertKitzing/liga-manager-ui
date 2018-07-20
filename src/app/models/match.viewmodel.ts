import { Match, Team } from 'src/api';

export class MatchViewModel extends Match {
    public home_team_name: Team;
    public guest_team_name: Team;
}
