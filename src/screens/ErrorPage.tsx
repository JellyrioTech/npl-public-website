import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
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
            <Button
                text={"Go To Home"}
                onClick={() => navigate(routes.Home)}
            ></Button>
        </div>
    );
};

export default ErrorPage;
