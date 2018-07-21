import { Match, Team, Pitch } from 'src/api';

export class MatchViewModel extends Match {
    public home_team: Team;
    public guest_team: Team;
    public pitch: Pitch;
}
