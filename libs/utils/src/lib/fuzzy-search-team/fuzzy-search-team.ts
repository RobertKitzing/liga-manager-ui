import { Team } from '@liga-manager-api/graphql';
import fuzzysearch from 'fuzzysearch-ts';

export function fuzzySearchTeam(name: string, teams: Team[]) {
    return teams.filter(
        (t) => fuzzysearch(name.toLocaleLowerCase(), t?.name.toLowerCase() || ''),
    );
}
