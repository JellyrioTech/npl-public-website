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
};

export const admin_routes = {
    dashboard: `${routes.Admin}/dashboard`,
    arena: `${routes.Admin}/arena`,
};
