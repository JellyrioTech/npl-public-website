import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomePage";
import TournamentInfoPage from "./screens/TournamentInfoPage";
import routes from "./util/routes";
import RegisterPage from "./screens/RegisterPage";
import Layout from "./screens/Layout";
import DownloadPage from "./screens/DownloadPage";
import PrivacyPolicyPage from "./screens/PrivacyPolicyPage";
import TermsAndConditionPage from "./screens/TermsAndConditionPage";
import AboutUsPage from "./screens/AboutUsPage";
import ContactUsPage from "./screens/ContactUsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={routes.LearnMore} element={<Layout />}>
                    <Route index element={<TournamentInfoPage />} />
                </Route>
                <Route path={routes.RegisterNow} element={<Layout />}>
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
            </Routes>
        </Router>
    );
}

export default App;
