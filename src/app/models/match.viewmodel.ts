import { Match, Team, Pitch } from '../../api';

export class MatchViewModel extends Match {
    public home_team: Team;
    public guest_team: Team;
    public pitch: Pitch;
}
