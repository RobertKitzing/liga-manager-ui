/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment Match on Match {\n  id\n  home_team {\n    ...Team\n  }\n  home_score\n  guest_team {\n    ...Team\n  }\n  guest_score\n  kickoff\n  pitch {\n    ...Pitch\n  }\n  cancelled_at\n  cancellation_reason\n}\n\nfragment MatchDay on MatchDay {\n  id\n  number\n  start_date\n  end_date\n  matches {\n    ...Match\n  }\n}\n\nfragment Pitch on Pitch {\n  id\n  label\n  location_longitude\n  location_latitude\n  contact {\n    ...Contact\n  }\n}\n\nfragment Team on Team {\n  id\n  name\n  logo_id\n  logo_path\n  created_at\n  contact {\n    ...Contact\n  }\n}\n\nfragment Contact on Contact {\n  first_name\n  last_name\n  phone\n  email\n}\n\nfragment Season on Season {\n  id\n  name\n  state\n  teams {\n    ...Team\n  }\n  match_days {\n    ...MatchDay\n  }\n}\n\nfragment AllSeasons on Season {\n  id\n  name\n  state\n  match_days {\n    number\n    start_date\n    end_date\n  }\n}\n\nfragment AllSeasonsHoF on Season {\n  id\n  name\n  state\n  match_days {\n    number\n    start_date\n  }\n  ranking {\n    positions {\n      team {\n        ...Team\n      }\n      sort_index\n    }\n  }\n}\n\nfragment AllSeasonsCalendar on Season {\n  id\n  name\n  state\n  match_days {\n    ...MatchDay\n  }\n}\n\nfragment AllTournaments on Tournament {\n  id\n  name\n  state\n}\n\nfragment AllTournamentsHoF on Tournament {\n  id\n  name\n  state\n  rounds {\n    ...MatchDay\n  }\n}\n\nfragment AllTournamentsCalendar on Tournament {\n  id\n  name\n  state\n  rounds {\n    ...MatchDay\n  }\n}\n\nfragment Tournament on Tournament {\n  id\n  name\n  rounds {\n    ...MatchDay\n  }\n  state\n}\n\nfragment User on User {\n  id\n  email\n  teams {\n    ...Team\n  }\n  role\n  first_name\n  last_name\n}\n\nfragment Event on Event {\n  id\n  occurred_at\n  type\n}\n\nfragment Ranking on Season {\n  id\n  ranking {\n    updated_at\n    positions {\n      team {\n        ...Team\n      }\n      sort_index\n      number\n      matches\n      wins\n      draws\n      losses\n      scored_goals\n      conceded_goals\n      points\n    }\n    penalties {\n      ...Penalty\n    }\n  }\n}\n\nfragment Penalty on RankingPenalty {\n  id\n  team {\n    ...Team\n  }\n  reason\n  created_at\n  points\n}": typeof types.MatchFragmentDoc,
    "mutation CreateMatchDayForSeason($id: String!, $season_id: String!, $number: Int!, $date_period: DatePeriod!) {\n  createMatchDayForSeason(\n    id: $id\n    season_id: $season_id\n    number: $number\n    date_period: $date_period\n  )\n}": typeof types.CreateMatchDayForSeasonDocument,
    "mutation CreateMatch($id: String!, $match_day_id: String!, $home_team_id: String!, $guest_team_id: String!) {\n  createMatch(\n    id: $id\n    match_day_id: $match_day_id\n    home_team_id: $home_team_id\n    guest_team_id: $guest_team_id\n  )\n}": typeof types.CreateMatchDocument,
    "mutation SubmitResult($match_id: String!, $home_score: Int, $guest_score: Int) {\n  submitMatchResult(\n    match_id: $match_id\n    home_score: $home_score\n    guest_score: $guest_score\n  )\n}\n\nmutation ScheduleMatch($match_id: String!, $kickoff: DateTime!) {\n  scheduleMatch(match_id: $match_id, kickoff: $kickoff)\n}\n\nmutation LocateMatch($match_id: String!, $pitch_id: String!) {\n  locateMatch(match_id: $match_id, pitch_id: $pitch_id)\n}\n\nmutation CancelMatch($match_id: String!, $reason: String!) {\n  cancelMatch(match_id: $match_id, reason: $reason)\n}\n\nmutation ScheduleAllMatchesForSeason($season_id: String!, $match_appointments: [MatchAppointment]!) {\n  scheduleAllMatchesForSeason(\n    season_id: $season_id\n    match_appointments: $match_appointments\n  )\n}\n\nmutation ScheduleAllMatchesForMatchDay($match_day_id: String!, $match_appointments: [MatchAppointment]!) {\n  scheduleAllMatchesForMatchDay(\n    match_day_id: $match_day_id\n    match_appointments: $match_appointments\n  )\n}": typeof types.SubmitResultDocument,
    "mutation PasswordReset($email: String!, $target_path: String!) {\n  sendPasswordResetMail(email: $email, target_path: $target_path)\n}\n\nmutation PasswordChange($new_password: String!) {\n  changeUserPassword(new_password: $new_password)\n}": typeof types.PasswordResetDocument,
    "mutation AddPenalty($id: String!, $season_id: String!, $team_id: String!, $reason: String!, $points: Int!) {\n  addRankingPenalty(\n    id: $id\n    season_id: $season_id\n    team_id: $team_id\n    reason: $reason\n    points: $points\n  )\n}\n\nmutation RemovePenalty($ranking_penalty_id: String!, $season_id: String!) {\n  removeRankingPenalty(\n    ranking_penalty_id: $ranking_penalty_id\n    season_id: $season_id\n  )\n}": typeof types.AddPenaltyDocument,
    "mutation DeletePitch($pitch_id: String!) {\n  deletePitch(pitch_id: $pitch_id)\n}\n\nmutation UpdatePitchContact($pitch_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {\n  updatePitchContact(\n    pitch_id: $pitch_id\n    first_name: $first_name\n    last_name: $last_name\n    phone: $phone\n    email: $email\n  )\n}\n\nmutation CreatePitch($id: String!, $label: String!, $location_longitude: Float!, $location_latitude: Float!) {\n  createPitch(\n    id: $id\n    label: $label\n    longitude: $location_longitude\n    latitude: $location_latitude\n  )\n}": typeof types.DeletePitchDocument,
    "mutation CreateSeason($season_id: String, $name: String!) {\n  createSeason(id: $season_id, name: $name)\n}": typeof types.CreateSeasonDocument,
    "mutation DeleteSeason($season_id: String!) {\n  deleteSeason(season_id: $season_id)\n}": typeof types.DeleteSeasonDocument,
    "mutation EndSeason($season_id: String!) {\n  endSeason(season_id: $season_id)\n}": typeof types.EndSeasonDocument,
    "mutation StartSeason($season_id: String!) {\n  startSeason(season_id: $season_id)\n}": typeof types.StartSeasonDocument,
    "mutation AddTeamToSeason($season_id: String!, $team_id: String!) {\n  addTeamToSeason(season_id: $season_id, team_id: $team_id)\n}\n\nmutation RemoveTeamFromSeason($season_id: String!, $team_id: String!) {\n  removeTeamFromSeason(season_id: $season_id, team_id: $team_id)\n}\n\nmutation CreateMatchesForSeason($season_id: String!, $dates: [DatePeriod]!) {\n  createMatchesForSeason(season_id: $season_id, dates: $dates)\n}\n\nmutation RescheduleMatchDay($match_day_id: String!, $date_period: DatePeriod!) {\n  rescheduleMatchDay(match_day_id: $match_day_id, date_period: $date_period)\n}\n\nmutation ReplaceTeamInSeason($season_id: String!, $current_team_id: String!, $replacement_team_id: String!) {\n  replaceTeamInSeason(\n    season_id: $season_id\n    current_team_id: $current_team_id\n    replacement_team_id: $replacement_team_id\n  )\n}": typeof types.AddTeamToSeasonDocument,
    "mutation CreateTeam($id: String!, $name: String!) {\n  createTeam(id: $id, name: $name)\n}": typeof types.CreateTeamDocument,
    "mutation UpdateTeamContact($team_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {\n  updateTeamContact(\n    team_id: $team_id\n    first_name: $first_name\n    last_name: $last_name\n    phone: $phone\n    email: $email\n  )\n}\n\nmutation RenameTeam($team_id: String!, $new_name: String!) {\n  renameTeam(team_id: $team_id, new_name: $new_name)\n}\n\nmutation DeleteTeam($team_id: String!) {\n  deleteTeam(team_id: $team_id)\n}": typeof types.UpdateTeamContactDocument,
    "mutation CreateTournament($id: String, $name: String!) {\n  createTournament(id: $id, name: $name)\n}\n\nmutation CreateTournamentRound($tournament_id: String!, $round: Int!, $team_id_pairs: [TeamIdPair]!, $date_period: DatePeriod!) {\n  setTournamentRound(\n    tournament_id: $tournament_id\n    round: $round\n    team_id_pairs: $team_id_pairs\n    date_period: $date_period\n  )\n}\n\nmutation DeleteTournament($tournament_id: String!) {\n  deleteTournament(tournament_id: $tournament_id)\n}\n\nmutation StartTournament($tournament_id: String!) {\n  startTournament(tournament_id: $tournament_id)\n}\n\nmutation EndTournament($tournament_id: String!) {\n  endTournament(tournament_id: $tournament_id)\n}": typeof types.CreateTournamentDocument,
    "mutation CreateUser($user_id: String, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $team_ids: [String]!) {\n  createUser(\n    id: $user_id\n    email: $email\n    password: $password\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}": typeof types.CreateUserDocument,
    "mutation UpdateUser($user_id: String!, $email: String, $first_name: String, $last_name: String, $role: String, $team_ids: [String]) {\n  updateUser(\n    user_id: $user_id\n    email: $email\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}\n\nmutation DeleteUser($user_id: String!) {\n  deleteUser(user_id: $user_id)\n}\n\nmutation InviteUser($user_id: String!, $target_path: String!) {\n  sendInviteMail(user_id: $user_id, target_path: $target_path)\n}": typeof types.UpdateUserDocument,
    "query AuthenticatedUserId {\n  authenticatedUser {\n    id\n  }\n}": typeof types.AuthenticatedUserIdDocument,
    "query Calendar($min_date: DateTime, $max_date: DateTime) {\n  allSeasons {\n    id\n    name\n    state\n    match_days {\n      number\n      start_date\n      end_date\n    }\n  }\n  allTournaments {\n    id\n    name\n    state\n    rounds {\n      number\n      start_date\n      end_date\n    }\n  }\n  matchesByKickoff(min_date: $min_date, max_date: $max_date) {\n    id\n    home_team {\n      ...Team\n    }\n    guest_team {\n      ...Team\n    }\n    kickoff\n    home_score\n    guest_score\n    cancelled_at\n    cancellation_reason\n    pitch {\n      ...Pitch\n    }\n  }\n}": typeof types.CalendarDocument,
    "query AllEvent($id: String!) {\n  event(id: $id) {\n    ...Event\n  }\n}\n\nquery LatestEvent($start_date: Date, $end_date: Date, $type: String) {\n  latestEvents(start_date: $start_date, end_date: $end_date, type: $type) {\n    ...Event\n  }\n}": typeof types.AllEventDocument,
    "query HallOfFame {\n  allSeasons {\n    ...AllSeasonsHoF\n  }\n  allTournaments {\n    ...AllTournamentsHoF\n  }\n}": typeof types.HallOfFameDocument,
    "query MatchById($id: String!) {\n  match(id: $id) {\n    ...Match\n  }\n}": typeof types.MatchByIdDocument,
    "query SeasonPenalties($id: String!) {\n  season(id: $id) {\n    id\n    ranking {\n      penalties {\n        ...Penalty\n      }\n    }\n  }\n}": typeof types.SeasonPenaltiesDocument,
    "query Pitches {\n  allPitches {\n    ...Pitch\n  }\n}": typeof types.PitchesDocument,
    "query RankingById($id: String!) {\n  season(id: $id) {\n    ...Ranking\n  }\n}": typeof types.RankingByIdDocument,
    "query SeasonById($id: String!) {\n  season(id: $id) {\n    ...Season\n  }\n}": typeof types.SeasonByIdDocument,
    "query SeasonList {\n  allSeasons {\n    ...AllSeasons\n  }\n}": typeof types.SeasonListDocument,
    "query TeamById($id: String!) {\n  team(id: $id) {\n    ...Team\n  }\n}": typeof types.TeamByIdDocument,
    "query TeamList {\n  allTeams {\n    ...Team\n  }\n}": typeof types.TeamListDocument,
    "query TournamentById($id: String!) {\n  tournament(id: $id) {\n    ...Tournament\n  }\n}": typeof types.TournamentByIdDocument,
    "query TournamentList {\n  allTournaments {\n    ...AllTournaments\n  }\n}": typeof types.TournamentListDocument,
    "query AuthenticatedUser {\n  authenticatedUser {\n    ...User\n  }\n}\n\nquery AllUsers {\n  allUsers {\n    ...User\n  }\n}": typeof types.AuthenticatedUserDocument,
};
const documents: Documents = {
    "fragment Match on Match {\n  id\n  home_team {\n    ...Team\n  }\n  home_score\n  guest_team {\n    ...Team\n  }\n  guest_score\n  kickoff\n  pitch {\n    ...Pitch\n  }\n  cancelled_at\n  cancellation_reason\n}\n\nfragment MatchDay on MatchDay {\n  id\n  number\n  start_date\n  end_date\n  matches {\n    ...Match\n  }\n}\n\nfragment Pitch on Pitch {\n  id\n  label\n  location_longitude\n  location_latitude\n  contact {\n    ...Contact\n  }\n}\n\nfragment Team on Team {\n  id\n  name\n  logo_id\n  logo_path\n  created_at\n  contact {\n    ...Contact\n  }\n}\n\nfragment Contact on Contact {\n  first_name\n  last_name\n  phone\n  email\n}\n\nfragment Season on Season {\n  id\n  name\n  state\n  teams {\n    ...Team\n  }\n  match_days {\n    ...MatchDay\n  }\n}\n\nfragment AllSeasons on Season {\n  id\n  name\n  state\n  match_days {\n    number\n    start_date\n    end_date\n  }\n}\n\nfragment AllSeasonsHoF on Season {\n  id\n  name\n  state\n  match_days {\n    number\n    start_date\n  }\n  ranking {\n    positions {\n      team {\n        ...Team\n      }\n      sort_index\n    }\n  }\n}\n\nfragment AllSeasonsCalendar on Season {\n  id\n  name\n  state\n  match_days {\n    ...MatchDay\n  }\n}\n\nfragment AllTournaments on Tournament {\n  id\n  name\n  state\n}\n\nfragment AllTournamentsHoF on Tournament {\n  id\n  name\n  state\n  rounds {\n    ...MatchDay\n  }\n}\n\nfragment AllTournamentsCalendar on Tournament {\n  id\n  name\n  state\n  rounds {\n    ...MatchDay\n  }\n}\n\nfragment Tournament on Tournament {\n  id\n  name\n  rounds {\n    ...MatchDay\n  }\n  state\n}\n\nfragment User on User {\n  id\n  email\n  teams {\n    ...Team\n  }\n  role\n  first_name\n  last_name\n}\n\nfragment Event on Event {\n  id\n  occurred_at\n  type\n}\n\nfragment Ranking on Season {\n  id\n  ranking {\n    updated_at\n    positions {\n      team {\n        ...Team\n      }\n      sort_index\n      number\n      matches\n      wins\n      draws\n      losses\n      scored_goals\n      conceded_goals\n      points\n    }\n    penalties {\n      ...Penalty\n    }\n  }\n}\n\nfragment Penalty on RankingPenalty {\n  id\n  team {\n    ...Team\n  }\n  reason\n  created_at\n  points\n}": types.MatchFragmentDoc,
    "mutation CreateMatchDayForSeason($id: String!, $season_id: String!, $number: Int!, $date_period: DatePeriod!) {\n  createMatchDayForSeason(\n    id: $id\n    season_id: $season_id\n    number: $number\n    date_period: $date_period\n  )\n}": types.CreateMatchDayForSeasonDocument,
    "mutation CreateMatch($id: String!, $match_day_id: String!, $home_team_id: String!, $guest_team_id: String!) {\n  createMatch(\n    id: $id\n    match_day_id: $match_day_id\n    home_team_id: $home_team_id\n    guest_team_id: $guest_team_id\n  )\n}": types.CreateMatchDocument,
    "mutation SubmitResult($match_id: String!, $home_score: Int, $guest_score: Int) {\n  submitMatchResult(\n    match_id: $match_id\n    home_score: $home_score\n    guest_score: $guest_score\n  )\n}\n\nmutation ScheduleMatch($match_id: String!, $kickoff: DateTime!) {\n  scheduleMatch(match_id: $match_id, kickoff: $kickoff)\n}\n\nmutation LocateMatch($match_id: String!, $pitch_id: String!) {\n  locateMatch(match_id: $match_id, pitch_id: $pitch_id)\n}\n\nmutation CancelMatch($match_id: String!, $reason: String!) {\n  cancelMatch(match_id: $match_id, reason: $reason)\n}\n\nmutation ScheduleAllMatchesForSeason($season_id: String!, $match_appointments: [MatchAppointment]!) {\n  scheduleAllMatchesForSeason(\n    season_id: $season_id\n    match_appointments: $match_appointments\n  )\n}\n\nmutation ScheduleAllMatchesForMatchDay($match_day_id: String!, $match_appointments: [MatchAppointment]!) {\n  scheduleAllMatchesForMatchDay(\n    match_day_id: $match_day_id\n    match_appointments: $match_appointments\n  )\n}": types.SubmitResultDocument,
    "mutation PasswordReset($email: String!, $target_path: String!) {\n  sendPasswordResetMail(email: $email, target_path: $target_path)\n}\n\nmutation PasswordChange($new_password: String!) {\n  changeUserPassword(new_password: $new_password)\n}": types.PasswordResetDocument,
    "mutation AddPenalty($id: String!, $season_id: String!, $team_id: String!, $reason: String!, $points: Int!) {\n  addRankingPenalty(\n    id: $id\n    season_id: $season_id\n    team_id: $team_id\n    reason: $reason\n    points: $points\n  )\n}\n\nmutation RemovePenalty($ranking_penalty_id: String!, $season_id: String!) {\n  removeRankingPenalty(\n    ranking_penalty_id: $ranking_penalty_id\n    season_id: $season_id\n  )\n}": types.AddPenaltyDocument,
    "mutation DeletePitch($pitch_id: String!) {\n  deletePitch(pitch_id: $pitch_id)\n}\n\nmutation UpdatePitchContact($pitch_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {\n  updatePitchContact(\n    pitch_id: $pitch_id\n    first_name: $first_name\n    last_name: $last_name\n    phone: $phone\n    email: $email\n  )\n}\n\nmutation CreatePitch($id: String!, $label: String!, $location_longitude: Float!, $location_latitude: Float!) {\n  createPitch(\n    id: $id\n    label: $label\n    longitude: $location_longitude\n    latitude: $location_latitude\n  )\n}": types.DeletePitchDocument,
    "mutation CreateSeason($season_id: String, $name: String!) {\n  createSeason(id: $season_id, name: $name)\n}": types.CreateSeasonDocument,
    "mutation DeleteSeason($season_id: String!) {\n  deleteSeason(season_id: $season_id)\n}": types.DeleteSeasonDocument,
    "mutation EndSeason($season_id: String!) {\n  endSeason(season_id: $season_id)\n}": types.EndSeasonDocument,
    "mutation StartSeason($season_id: String!) {\n  startSeason(season_id: $season_id)\n}": types.StartSeasonDocument,
    "mutation AddTeamToSeason($season_id: String!, $team_id: String!) {\n  addTeamToSeason(season_id: $season_id, team_id: $team_id)\n}\n\nmutation RemoveTeamFromSeason($season_id: String!, $team_id: String!) {\n  removeTeamFromSeason(season_id: $season_id, team_id: $team_id)\n}\n\nmutation CreateMatchesForSeason($season_id: String!, $dates: [DatePeriod]!) {\n  createMatchesForSeason(season_id: $season_id, dates: $dates)\n}\n\nmutation RescheduleMatchDay($match_day_id: String!, $date_period: DatePeriod!) {\n  rescheduleMatchDay(match_day_id: $match_day_id, date_period: $date_period)\n}\n\nmutation ReplaceTeamInSeason($season_id: String!, $current_team_id: String!, $replacement_team_id: String!) {\n  replaceTeamInSeason(\n    season_id: $season_id\n    current_team_id: $current_team_id\n    replacement_team_id: $replacement_team_id\n  )\n}": types.AddTeamToSeasonDocument,
    "mutation CreateTeam($id: String!, $name: String!) {\n  createTeam(id: $id, name: $name)\n}": types.CreateTeamDocument,
    "mutation UpdateTeamContact($team_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {\n  updateTeamContact(\n    team_id: $team_id\n    first_name: $first_name\n    last_name: $last_name\n    phone: $phone\n    email: $email\n  )\n}\n\nmutation RenameTeam($team_id: String!, $new_name: String!) {\n  renameTeam(team_id: $team_id, new_name: $new_name)\n}\n\nmutation DeleteTeam($team_id: String!) {\n  deleteTeam(team_id: $team_id)\n}": types.UpdateTeamContactDocument,
    "mutation CreateTournament($id: String, $name: String!) {\n  createTournament(id: $id, name: $name)\n}\n\nmutation CreateTournamentRound($tournament_id: String!, $round: Int!, $team_id_pairs: [TeamIdPair]!, $date_period: DatePeriod!) {\n  setTournamentRound(\n    tournament_id: $tournament_id\n    round: $round\n    team_id_pairs: $team_id_pairs\n    date_period: $date_period\n  )\n}\n\nmutation DeleteTournament($tournament_id: String!) {\n  deleteTournament(tournament_id: $tournament_id)\n}\n\nmutation StartTournament($tournament_id: String!) {\n  startTournament(tournament_id: $tournament_id)\n}\n\nmutation EndTournament($tournament_id: String!) {\n  endTournament(tournament_id: $tournament_id)\n}": types.CreateTournamentDocument,
    "mutation CreateUser($user_id: String, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $team_ids: [String]!) {\n  createUser(\n    id: $user_id\n    email: $email\n    password: $password\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}": types.CreateUserDocument,
    "mutation UpdateUser($user_id: String!, $email: String, $first_name: String, $last_name: String, $role: String, $team_ids: [String]) {\n  updateUser(\n    user_id: $user_id\n    email: $email\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}\n\nmutation DeleteUser($user_id: String!) {\n  deleteUser(user_id: $user_id)\n}\n\nmutation InviteUser($user_id: String!, $target_path: String!) {\n  sendInviteMail(user_id: $user_id, target_path: $target_path)\n}": types.UpdateUserDocument,
    "query AuthenticatedUserId {\n  authenticatedUser {\n    id\n  }\n}": types.AuthenticatedUserIdDocument,
    "query Calendar($min_date: DateTime, $max_date: DateTime) {\n  allSeasons {\n    id\n    name\n    state\n    match_days {\n      number\n      start_date\n      end_date\n    }\n  }\n  allTournaments {\n    id\n    name\n    state\n    rounds {\n      number\n      start_date\n      end_date\n    }\n  }\n  matchesByKickoff(min_date: $min_date, max_date: $max_date) {\n    id\n    home_team {\n      ...Team\n    }\n    guest_team {\n      ...Team\n    }\n    kickoff\n    home_score\n    guest_score\n    cancelled_at\n    cancellation_reason\n    pitch {\n      ...Pitch\n    }\n  }\n}": types.CalendarDocument,
    "query AllEvent($id: String!) {\n  event(id: $id) {\n    ...Event\n  }\n}\n\nquery LatestEvent($start_date: Date, $end_date: Date, $type: String) {\n  latestEvents(start_date: $start_date, end_date: $end_date, type: $type) {\n    ...Event\n  }\n}": types.AllEventDocument,
    "query HallOfFame {\n  allSeasons {\n    ...AllSeasonsHoF\n  }\n  allTournaments {\n    ...AllTournamentsHoF\n  }\n}": types.HallOfFameDocument,
    "query MatchById($id: String!) {\n  match(id: $id) {\n    ...Match\n  }\n}": types.MatchByIdDocument,
    "query SeasonPenalties($id: String!) {\n  season(id: $id) {\n    id\n    ranking {\n      penalties {\n        ...Penalty\n      }\n    }\n  }\n}": types.SeasonPenaltiesDocument,
    "query Pitches {\n  allPitches {\n    ...Pitch\n  }\n}": types.PitchesDocument,
    "query RankingById($id: String!) {\n  season(id: $id) {\n    ...Ranking\n  }\n}": types.RankingByIdDocument,
    "query SeasonById($id: String!) {\n  season(id: $id) {\n    ...Season\n  }\n}": types.SeasonByIdDocument,
    "query SeasonList {\n  allSeasons {\n    ...AllSeasons\n  }\n}": types.SeasonListDocument,
    "query TeamById($id: String!) {\n  team(id: $id) {\n    ...Team\n  }\n}": types.TeamByIdDocument,
    "query TeamList {\n  allTeams {\n    ...Team\n  }\n}": types.TeamListDocument,
    "query TournamentById($id: String!) {\n  tournament(id: $id) {\n    ...Tournament\n  }\n}": types.TournamentByIdDocument,
    "query TournamentList {\n  allTournaments {\n    ...AllTournaments\n  }\n}": types.TournamentListDocument,
    "query AuthenticatedUser {\n  authenticatedUser {\n    ...User\n  }\n}\n\nquery AllUsers {\n  allUsers {\n    ...User\n  }\n}": types.AuthenticatedUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Match on Match {\n  id\n  home_team {\n    ...Team\n  }\n  home_score\n  guest_team {\n    ...Team\n  }\n  guest_score\n  kickoff\n  pitch {\n    ...Pitch\n  }\n  cancelled_at\n  cancellation_reason\n}\n\nfragment MatchDay on MatchDay {\n  id\n  number\n  start_date\n  end_date\n  matches {\n    ...Match\n  }\n}\n\nfragment Pitch on Pitch {\n  id\n  label\n  location_longitude\n  location_latitude\n  contact {\n    ...Contact\n  }\n}\n\nfragment Team on Team {\n  id\n  name\n  logo_id\n  logo_path\n  created_at\n  contact {\n    ...Contact\n  }\n}\n\nfragment Contact on Contact {\n  first_name\n  last_name\n  phone\n  email\n}\n\nfragment Season on Season {\n  id\n  name\n  state\n  teams {\n    ...Team\n  }\n  match_days {\n    ...MatchDay\n  }\n}\n\nfragment AllSeasons on Season {\n  id\n  name\n  state\n  match_days {\n    number\n    start_date\n    end_date\n  }\n}\n\nfragment AllSeasonsHoF on Season {\n  id\n  name\n  state\n  match_days {\n    number\n    start_date\n  }\n  ranking {\n    positions {\n      team {\n        ...Team\n      }\n      sort_index\n    }\n  }\n}\n\nfragment AllSeasonsCalendar on Season {\n  id\n  name\n  state\n  match_days {\n    ...MatchDay\n  }\n}\n\nfragment AllTournaments on Tournament {\n  id\n  name\n  state\n}\n\nfragment AllTournamentsHoF on Tournament {\n  id\n  name\n  state\n  rounds {\n    ...MatchDay\n  }\n}\n\nfragment AllTournamentsCalendar on Tournament {\n  id\n  name\n  state\n  rounds {\n    ...MatchDay\n  }\n}\n\nfragment Tournament on Tournament {\n  id\n  name\n  rounds {\n    ...MatchDay\n  }\n  state\n}\n\nfragment User on User {\n  id\n  email\n  teams {\n    ...Team\n  }\n  role\n  first_name\n  last_name\n}\n\nfragment Event on Event {\n  id\n  occurred_at\n  type\n}\n\nfragment Ranking on Season {\n  id\n  ranking {\n    updated_at\n    positions {\n      team {\n        ...Team\n      }\n      sort_index\n      number\n      matches\n      wins\n      draws\n      losses\n      scored_goals\n      conceded_goals\n      points\n    }\n    penalties {\n      ...Penalty\n    }\n  }\n}\n\nfragment Penalty on RankingPenalty {\n  id\n  team {\n    ...Team\n  }\n  reason\n  created_at\n  points\n}"): typeof import('./graphql').MatchFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateMatchDayForSeason($id: String!, $season_id: String!, $number: Int!, $date_period: DatePeriod!) {\n  createMatchDayForSeason(\n    id: $id\n    season_id: $season_id\n    number: $number\n    date_period: $date_period\n  )\n}"): typeof import('./graphql').CreateMatchDayForSeasonDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateMatch($id: String!, $match_day_id: String!, $home_team_id: String!, $guest_team_id: String!) {\n  createMatch(\n    id: $id\n    match_day_id: $match_day_id\n    home_team_id: $home_team_id\n    guest_team_id: $guest_team_id\n  )\n}"): typeof import('./graphql').CreateMatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SubmitResult($match_id: String!, $home_score: Int, $guest_score: Int) {\n  submitMatchResult(\n    match_id: $match_id\n    home_score: $home_score\n    guest_score: $guest_score\n  )\n}\n\nmutation ScheduleMatch($match_id: String!, $kickoff: DateTime!) {\n  scheduleMatch(match_id: $match_id, kickoff: $kickoff)\n}\n\nmutation LocateMatch($match_id: String!, $pitch_id: String!) {\n  locateMatch(match_id: $match_id, pitch_id: $pitch_id)\n}\n\nmutation CancelMatch($match_id: String!, $reason: String!) {\n  cancelMatch(match_id: $match_id, reason: $reason)\n}\n\nmutation ScheduleAllMatchesForSeason($season_id: String!, $match_appointments: [MatchAppointment]!) {\n  scheduleAllMatchesForSeason(\n    season_id: $season_id\n    match_appointments: $match_appointments\n  )\n}\n\nmutation ScheduleAllMatchesForMatchDay($match_day_id: String!, $match_appointments: [MatchAppointment]!) {\n  scheduleAllMatchesForMatchDay(\n    match_day_id: $match_day_id\n    match_appointments: $match_appointments\n  )\n}"): typeof import('./graphql').SubmitResultDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PasswordReset($email: String!, $target_path: String!) {\n  sendPasswordResetMail(email: $email, target_path: $target_path)\n}\n\nmutation PasswordChange($new_password: String!) {\n  changeUserPassword(new_password: $new_password)\n}"): typeof import('./graphql').PasswordResetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddPenalty($id: String!, $season_id: String!, $team_id: String!, $reason: String!, $points: Int!) {\n  addRankingPenalty(\n    id: $id\n    season_id: $season_id\n    team_id: $team_id\n    reason: $reason\n    points: $points\n  )\n}\n\nmutation RemovePenalty($ranking_penalty_id: String!, $season_id: String!) {\n  removeRankingPenalty(\n    ranking_penalty_id: $ranking_penalty_id\n    season_id: $season_id\n  )\n}"): typeof import('./graphql').AddPenaltyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePitch($pitch_id: String!) {\n  deletePitch(pitch_id: $pitch_id)\n}\n\nmutation UpdatePitchContact($pitch_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {\n  updatePitchContact(\n    pitch_id: $pitch_id\n    first_name: $first_name\n    last_name: $last_name\n    phone: $phone\n    email: $email\n  )\n}\n\nmutation CreatePitch($id: String!, $label: String!, $location_longitude: Float!, $location_latitude: Float!) {\n  createPitch(\n    id: $id\n    label: $label\n    longitude: $location_longitude\n    latitude: $location_latitude\n  )\n}"): typeof import('./graphql').DeletePitchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateSeason($season_id: String, $name: String!) {\n  createSeason(id: $season_id, name: $name)\n}"): typeof import('./graphql').CreateSeasonDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteSeason($season_id: String!) {\n  deleteSeason(season_id: $season_id)\n}"): typeof import('./graphql').DeleteSeasonDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation EndSeason($season_id: String!) {\n  endSeason(season_id: $season_id)\n}"): typeof import('./graphql').EndSeasonDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation StartSeason($season_id: String!) {\n  startSeason(season_id: $season_id)\n}"): typeof import('./graphql').StartSeasonDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddTeamToSeason($season_id: String!, $team_id: String!) {\n  addTeamToSeason(season_id: $season_id, team_id: $team_id)\n}\n\nmutation RemoveTeamFromSeason($season_id: String!, $team_id: String!) {\n  removeTeamFromSeason(season_id: $season_id, team_id: $team_id)\n}\n\nmutation CreateMatchesForSeason($season_id: String!, $dates: [DatePeriod]!) {\n  createMatchesForSeason(season_id: $season_id, dates: $dates)\n}\n\nmutation RescheduleMatchDay($match_day_id: String!, $date_period: DatePeriod!) {\n  rescheduleMatchDay(match_day_id: $match_day_id, date_period: $date_period)\n}\n\nmutation ReplaceTeamInSeason($season_id: String!, $current_team_id: String!, $replacement_team_id: String!) {\n  replaceTeamInSeason(\n    season_id: $season_id\n    current_team_id: $current_team_id\n    replacement_team_id: $replacement_team_id\n  )\n}"): typeof import('./graphql').AddTeamToSeasonDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTeam($id: String!, $name: String!) {\n  createTeam(id: $id, name: $name)\n}"): typeof import('./graphql').CreateTeamDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTeamContact($team_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {\n  updateTeamContact(\n    team_id: $team_id\n    first_name: $first_name\n    last_name: $last_name\n    phone: $phone\n    email: $email\n  )\n}\n\nmutation RenameTeam($team_id: String!, $new_name: String!) {\n  renameTeam(team_id: $team_id, new_name: $new_name)\n}\n\nmutation DeleteTeam($team_id: String!) {\n  deleteTeam(team_id: $team_id)\n}"): typeof import('./graphql').UpdateTeamContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTournament($id: String, $name: String!) {\n  createTournament(id: $id, name: $name)\n}\n\nmutation CreateTournamentRound($tournament_id: String!, $round: Int!, $team_id_pairs: [TeamIdPair]!, $date_period: DatePeriod!) {\n  setTournamentRound(\n    tournament_id: $tournament_id\n    round: $round\n    team_id_pairs: $team_id_pairs\n    date_period: $date_period\n  )\n}\n\nmutation DeleteTournament($tournament_id: String!) {\n  deleteTournament(tournament_id: $tournament_id)\n}\n\nmutation StartTournament($tournament_id: String!) {\n  startTournament(tournament_id: $tournament_id)\n}\n\nmutation EndTournament($tournament_id: String!) {\n  endTournament(tournament_id: $tournament_id)\n}"): typeof import('./graphql').CreateTournamentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($user_id: String, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $team_ids: [String]!) {\n  createUser(\n    id: $user_id\n    email: $email\n    password: $password\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}"): typeof import('./graphql').CreateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($user_id: String!, $email: String, $first_name: String, $last_name: String, $role: String, $team_ids: [String]) {\n  updateUser(\n    user_id: $user_id\n    email: $email\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}\n\nmutation DeleteUser($user_id: String!) {\n  deleteUser(user_id: $user_id)\n}\n\nmutation InviteUser($user_id: String!, $target_path: String!) {\n  sendInviteMail(user_id: $user_id, target_path: $target_path)\n}"): typeof import('./graphql').UpdateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AuthenticatedUserId {\n  authenticatedUser {\n    id\n  }\n}"): typeof import('./graphql').AuthenticatedUserIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Calendar($min_date: DateTime, $max_date: DateTime) {\n  allSeasons {\n    id\n    name\n    state\n    match_days {\n      number\n      start_date\n      end_date\n    }\n  }\n  allTournaments {\n    id\n    name\n    state\n    rounds {\n      number\n      start_date\n      end_date\n    }\n  }\n  matchesByKickoff(min_date: $min_date, max_date: $max_date) {\n    id\n    home_team {\n      ...Team\n    }\n    guest_team {\n      ...Team\n    }\n    kickoff\n    home_score\n    guest_score\n    cancelled_at\n    cancellation_reason\n    pitch {\n      ...Pitch\n    }\n  }\n}"): typeof import('./graphql').CalendarDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllEvent($id: String!) {\n  event(id: $id) {\n    ...Event\n  }\n}\n\nquery LatestEvent($start_date: Date, $end_date: Date, $type: String) {\n  latestEvents(start_date: $start_date, end_date: $end_date, type: $type) {\n    ...Event\n  }\n}"): typeof import('./graphql').AllEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query HallOfFame {\n  allSeasons {\n    ...AllSeasonsHoF\n  }\n  allTournaments {\n    ...AllTournamentsHoF\n  }\n}"): typeof import('./graphql').HallOfFameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MatchById($id: String!) {\n  match(id: $id) {\n    ...Match\n  }\n}"): typeof import('./graphql').MatchByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SeasonPenalties($id: String!) {\n  season(id: $id) {\n    id\n    ranking {\n      penalties {\n        ...Penalty\n      }\n    }\n  }\n}"): typeof import('./graphql').SeasonPenaltiesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Pitches {\n  allPitches {\n    ...Pitch\n  }\n}"): typeof import('./graphql').PitchesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RankingById($id: String!) {\n  season(id: $id) {\n    ...Ranking\n  }\n}"): typeof import('./graphql').RankingByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SeasonById($id: String!) {\n  season(id: $id) {\n    ...Season\n  }\n}"): typeof import('./graphql').SeasonByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SeasonList {\n  allSeasons {\n    ...AllSeasons\n  }\n}"): typeof import('./graphql').SeasonListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query TeamById($id: String!) {\n  team(id: $id) {\n    ...Team\n  }\n}"): typeof import('./graphql').TeamByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query TeamList {\n  allTeams {\n    ...Team\n  }\n}"): typeof import('./graphql').TeamListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query TournamentById($id: String!) {\n  tournament(id: $id) {\n    ...Tournament\n  }\n}"): typeof import('./graphql').TournamentByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query TournamentList {\n  allTournaments {\n    ...AllTournaments\n  }\n}"): typeof import('./graphql').TournamentListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AuthenticatedUser {\n  authenticatedUser {\n    ...User\n  }\n}\n\nquery AllUsers {\n  allUsers {\n    ...User\n  }\n}"): typeof import('./graphql').AuthenticatedUserDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
