import NetworkModuleEngine from "npl-service-module/dist/ModuleEngine";
import Cookies from "js-cookie";

const Environment = {
    ENV: import.meta.env.VITE_ENV,
    BLACKBLAZE_KEY: import.meta.env.VITE_BLACKBLAZE_KEY,
    BASE_URL: import.meta.env.VITE_BASE_URL,
    WS_URL: import.meta.env.VITE_WS_URL,
    SSO_BASE: import.meta.env.VITE_SSO_BASE,
    GAME_SERVICE_BASE: import.meta.env.VITE_GAME_SERVICE_BASE,
    GAME_SERVICE_API: import.meta.env.VITE_GAME_SERVICE_API,
};

export const NetworkModule = new NetworkModuleEngine({
    BASE_URL: Environment.BASE_URL,
    WS_URL: Environment.WS_URL,
    SSO_BASE: Environment.SSO_BASE,
    GAME_SERVICE_BASE: Environment.GAME_SERVICE_BASE,
    GAME_SERVICE_API: Environment.GAME_SERVICE_API,
    ENV: Environment.ENV,
    authTokenHandler: () => {
        const authToken = Cookies.get("jwt_token");
        return authToken || "";
    },
    networkErrorHandler: (httpCode) => {
        if (httpCode === 403) {
            Cookies.remove("auth_check");
            return;
        }
    },
    getDeviceId: () => {
        return "";
    },
    getDeviceType: () => {
        return "web";
    },
});
