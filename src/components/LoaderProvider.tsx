import { createContext, ReactNode, useContext, useState } from "react";

type LoaderContextProps = {
    showLoader: () => void;
    hideLoader: () => void;
    loading: boolean;
};

const LoaderContext = createContext<LoaderContextProps>({
    showLoader: () => {},
    hideLoader: () => {},
    loading: false,
});

export const useLoader = () => {
    return useContext(LoaderContext);
};

const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const showLoader = () => {
        setLoading(true);
    };
    const hideLoader = () => setLoading(false);
    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader, loading }}>
            {children}
        </LoaderContext.Provider>
    );
};

export default LoaderProvider;
