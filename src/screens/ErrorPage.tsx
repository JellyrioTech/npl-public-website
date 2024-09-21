import { useNavigate } from "react-router-dom";
import NPLButton from "../components/NPLButton";
import { routes } from "../util/routes";

type ErrorProps = {
    text?: string | undefined;
};

const ErrorPage: React.FC<ErrorProps> = (props: ErrorProps) => {
    const navigate = useNavigate();

    return (
        <div className="p-8 flex flex-col gap-4 items-center justify-center font-semibold text-secondary-300">
            {props.text === undefined
                ? "Something Is Wrong, please try again later"
                : props.text}
            <NPLButton
                text={"Go To Home"}
                onClick={() => navigate(routes.Home)}
            ></NPLButton>
        </div>
    );
};

export default ErrorPage;
