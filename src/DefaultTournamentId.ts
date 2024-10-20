export const DefaultTournamentID = 3;
export function GetTournamentId(tournamentId?: string) {
    if (tournamentId === "" || tournamentId === undefined) {
        return DefaultTournamentID;
    }
    return parseInt(tournamentId) || DefaultTournamentID;
}
