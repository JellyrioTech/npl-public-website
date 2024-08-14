export const routes = {
    Home: "/",
    LearnMore: "/tournament-info",
    Contact: "/contact",
    Register: "/register",
    Login: "/login",
    About: "/about",
    Download: "/download",
    PrivacyPolicy: "/privacyPolicy",
    TermsAndCondition: "/termsAndConditions",
    Admin: "/admin/inside",
    Error: "/404",
};

export const admin_routes = {
    dashboard: `${routes.Admin}/`,
    userList: `${routes.Admin}/users`,
    arenaDetails: (id: number) => `${routes.Admin}/arena/${id}`,
    arenaDetailsPath: `${routes.Admin}/arena/:arenaId`,
};
