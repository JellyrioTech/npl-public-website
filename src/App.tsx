import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/Home/HomePage";
import CurrentTournamentDetailsPage from "./screens/TournamentDetails/CurrentTournamentDetailsPage";
import { AdminRoutes, routes, UserRoutes } from "./util/routes";
import RegisterPage from "./screens/Registration/RegisterPage";
import ContentLayout from "./screens/Layouts/ContentLayout";
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
import ErrorPage from "./screens/ErrorPage";
import TournamentRegistrationConfirmationPage from "./screens/User/TournamentRegistration/TournamentConfirmation/TournamentRegistrationConfirmationPage";
import UserMainRouteGuard from "./guards/UserMainRouteGuard";
import TournamentPaymentPage from "./screens/User/TournamentRegistration/TournamentPayment/TournamentPaymentPage";
import TournamentPaymentSuccessPage from "./screens/User/TournamentRegistration/TournamentPayment/TournamentPaymentSuccessPage";
import TournamentPaymentErrorPage from "./screens/User/TournamentRegistration/TournamentPayment/TournamentPaymentError";
import LoaderProvider from "./components/LoaderProvider";
import TournamentDetailsPage from "./screens/TournamentDetails/TournamentDetailsPage";
import GroupDetailPage from "./screens/GroupDetail/GroupDetailPage";
import GameDetailPage from "./screens/GameDetail/GameDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePageLayout from "./screens/Layouts/HomePageLayout";
import RegistrationLayout from "./screens/Layouts/RegistrationLayout";
import MerchStorePage from "./screens/MerchStorePage";

function App() {
    return (
        <LoaderProvider>
            <ToastContainer
                position="top-center" // Set to top-right or top-center
                autoClose={5000} // Auto close after 5 seconds
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Router>
                <Routes>
                    <Route path={routes.Home} element={<HomePageLayout />}>
                        <Route index element={<HomePage />} />
                    </Route>

                    <Route
                        path={`${routes.CurrentTournamentRegistration}/:tournamentId?`}
                        element={<ContentLayout />}
                    >
                        <Route
                            index
                            element={<CurrentTournamentDetailsPage />}
                        />
                    </Route>
                    <Route
                        path={`${routes.Register}/:tournamentId?`}
                        element={<RegistrationLayout />}
                    >
                        <Route index element={<RegisterPage />} />
                    </Route>
                    <Route path={routes.Login} element={<ContentLayout />}>
                        <Route index element={<LoginPage />} />
                    </Route>
                    <Route path={routes.About} element={<ContentLayout />}>
                        <Route index element={<AboutUsPage />} />
                    </Route>
                    <Route path={routes.Download} element={<ContentLayout />}>
                        <Route index element={<DownloadPage />} />
                    </Route>
                    <Route path={routes.Contact} element={<ContentLayout />}>
                        <Route index element={<ContactUsPage />} />
                    </Route>

                    <Route
                        path={routes.PrivacyPolicy}
                        element={<ContentLayout />}
                    >
                        <Route index element={<PrivacyPolicyPage />} />
                    </Route>
                    <Route
                        path={routes.TermsAndCondition}
                        element={<ContentLayout />}
                    >
                        <Route index element={<TermsAndConditionPage />} />
                    </Route>
                    <Route path={routes.Error} element={<ContentLayout />}>
                        <Route index element={<ErrorPage />} />
                    </Route>
                    <Route path={routes.Admin} element={<AdminRouteGuard />}>
                        <Route index element={<AdminHomePage />} />
                    </Route>
                    <Route path={routes.Admin} element={<AdminRouteGuard />}>
                        <Route index element={<AdminArenaDetailsPage />} />
                    </Route>
                    <Route
                        path={AdminRoutes.arenaDetailsPath}
                        element={<AdminRouteGuard />}
                    >
                        <Route index element={<AdminArenaDetailsPage />} />
                    </Route>
                    <Route
                        path={AdminRoutes.userList}
                        element={<AdminRouteGuard />}
                    >
                        <Route index element={<UserListAdminPage />} />
                    </Route>
                    <Route
                        path={`${UserRoutes.TournamentConfirmRegistration}/:tournamentId`}
                        element={<UserMainRouteGuard />}
                    >
                        <Route
                            index
                            element={<TournamentRegistrationConfirmationPage />}
                        />
                    </Route>
                    <Route
                        path={`${UserRoutes.TournamentPayment}/:tournamentId`}
                        element={<UserMainRouteGuard />}
                    >
                        <Route index element={<TournamentPaymentPage />} />
                    </Route>
                    <Route
                        path={`${UserRoutes.TournamentPaymentSuccess}/:tournamentId`}
                        element={<UserMainRouteGuard />}
                    >
                        <Route
                            index
                            element={<TournamentPaymentSuccessPage />}
                        />
                    </Route>
                    <Route
                        path={`${UserRoutes.TournamentPaymentError}`}
                        element={<UserMainRouteGuard />}
                    >
                        <Route index element={<TournamentPaymentErrorPage />} />
                    </Route>
                    <Route
                        path={AdminRoutes.tournamentDetailsPath}
                        element={<AdminRouteGuard />}
                    >
                        <Route index element={<TournamentDetailsPage />} />
                    </Route>
                    <Route
                        path={AdminRoutes.groupDetailsPath}
                        element={<AdminRouteGuard />}
                    >
                        <Route index element={<GroupDetailPage />} />
                    </Route>
                    <Route
                        path={AdminRoutes.gameDetailsPath}
                        element={<AdminRouteGuard />}
                    >
                        <Route index element={<GameDetailPage />} />
                    </Route>
                    <Route path={routes.MerchStore} element={<ContentLayout />}>
                        <Route index element={<MerchStorePage />} />
                    </Route>
                </Routes>
            </Router>
        </LoaderProvider>
    );
}

export default App;
