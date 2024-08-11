import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomePage";
import TournamentInfoPage from "./screens/TournamentInfoPage";
import { routes, admin_routes } from "./util/routes";
import RegisterPage from "./screens/RegisterPage";
import Layout from "./screens/Layout";
import DownloadPage from "./screens/DownloadPage";
import PrivacyPolicyPage from "./screens/PrivacyPolicyPage";
import TermsAndConditionPage from "./screens/TermsAndConditionPage";
import AboutUsPage from "./screens/AboutUsPage";
import ContactUsPage from "./screens/ContactUsPage";
import LoginPage from "./screens/LoginPage";
import AdminRouteGuard from "./guards/AdminRouteGuard";
import AdminArenaDetailsPage from "./screens/ArenaDetails/AdminArenaDetailsPage";
import AdminHomePage from "./screens/AdminHomePage";
import UserListAdminPage from "./screens/UserListAdmin/UserListAdminPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={routes.LearnMore} element={<Layout />}>
                    <Route index element={<TournamentInfoPage />} />
                </Route>
                <Route path={routes.Register} element={<Layout />}>
                    <Route index element={<RegisterPage />} />
                </Route>
                <Route path={routes.About} element={<Layout />}>
                    <Route index element={<AboutUsPage />} />
                </Route>
                <Route path={routes.Download} element={<Layout />}>
                    <Route index element={<DownloadPage />} />
                </Route>
                <Route path={routes.Contact} element={<Layout />}>
                    <Route index element={<ContactUsPage />} />
                </Route>

                <Route path={routes.PrivacyPolicy} element={<Layout />}>
                    <Route index element={<PrivacyPolicyPage />} />
                </Route>
                <Route path={routes.TermsAndCondition} element={<Layout />}>
                    <Route index element={<TermsAndConditionPage />} />
                </Route>
                <Route path={routes.Home} element={<Layout />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path={routes.Login} element={<Layout />}>
                    <Route index element={<LoginPage />} />
                </Route>
                <Route path={routes.Admin} element={<AdminRouteGuard />}>
                    <Route index element={<AdminHomePage />} />
                </Route>
                <Route path={routes.Admin} element={<AdminRouteGuard />}>
                    <Route index element={<AdminArenaDetailsPage />} />
                </Route>
                <Route
                    path={admin_routes.arenaDetailsPath}
                    element={<AdminRouteGuard />}
                >
                    <Route index element={<AdminArenaDetailsPage />} />
                </Route>
                <Route
                    path={admin_routes.userList}
                    element={<AdminRouteGuard />}
                >
                    <Route index element={<UserListAdminPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
