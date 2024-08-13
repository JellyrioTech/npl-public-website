import NetworkModuleEngine from "npl-service-module/dist/ModuleEngine";
import { AuthToken } from "./util/Token";

const Environment = {
    ENV: "Development",
    BLACKBLAZE_KEY: "K004zFRZ93cIT1bDB5w6WzrB9JZ3Ye0",
    BASE_URL: "/adminApi",
    WS_URL: "ws://liver-nova-denied-postposted.trycloudflare.com/s2/",
    SSO_BASE: "/s1/api/sso",
    GAME_SERVICE_BASE: "/s2",
    GAME_SERVICE_API: "/api",
};

export const NetworkModule = new NetworkModuleEngine({
    BASE_URL: Environment.BASE_URL,
    WS_URL: Environment.WS_URL,
    SSO_BASE: Environment.SSO_BASE,
    GAME_SERVICE_BASE: Environment.GAME_SERVICE_BASE,
    GAME_SERVICE_API: Environment.GAME_SERVICE_API,
    ENV: Environment.ENV,
    authTokenHandler: () => {
        return AuthToken;
    },
    networkErrorHandler: () => {},
    getDeviceId: () => {
        return "";
    },
    getDeviceType: () => {
        return "web";
    },
});
