export const routes = {
    Home: "/",
    CurrentTournamentRegistration: `/tournamentRegistration`,
    Contact: "/contact",
    Register: "/register",
    Login: "/login",
    About: "/about",
    Download: "/download",
    PrivacyPolicy: "/privacyPolicy",
    TermsAndCondition: "/termsAndConditions",
    Admin: "/admin/inside",
    Error: "/404",
    User: "/main/inside",
};

export const UserRoutes = {
    TournamentConfirmRegistration: `${routes.User}/confirmRegistration`,
    TournamentPayment: `${routes.User}/tournamentPayment`,
    TournamentPaymentSuccess: `${routes.User}/paymentSuccess`,
    TournamentPaymentError: `${routes.User}/paymentError`,
};

export const AdminRoutes = {
    dashboard: `${routes.Admin}/`,
    userList: `${routes.Admin}/users`,
    arenaDetails: (id: number) => `${routes.Admin}/arena/${id}`,
    arenaDetailsPath: `${routes.Admin}/arena/:arenaId`,
    tournamentDetails: (id: number) => `${routes.Admin}/tournament/${id}`,
    tournamentDetailsPath: `${routes.Admin}/tournament/:tournamentId`,
    groupDetails: (id: number) => `${routes.Admin}/group/${id}`,
    groupDetailsPath: `${routes.Admin}/group/:groupId`,
    gameDetails: (id: number) => `${routes.Admin}/game/${id}`,
    gameDetailsPath: `${routes.Admin}/game/:gameId`,
};
