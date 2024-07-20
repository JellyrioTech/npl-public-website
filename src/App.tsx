import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomePage";
import TournamentInfoPage from "./screens/TournamentInfoPage";
import routes from "./util/routes";
import RegisterPage from "./screens/RegisterPage";
import Layout from "./screens/Layout";
import DownloadPage from "./screens/DownloadPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={routes.Home} element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path={routes.LearnMore}
                        element={<TournamentInfoPage />}
                    />
                    <Route
                        path={routes.RegisterNow}
                        element={<RegisterPage />}
                    />
                    <Route path={routes.Download} element={<DownloadPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
