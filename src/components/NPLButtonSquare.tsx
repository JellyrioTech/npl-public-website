import classNames from "classnames";

type ButtonProps = {
    onClick?: () => void;
    text: string;
    type?: "submit" | "button";
    special?: boolean;
};

const NPLButtonSquare: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className={`text-neutral-100 ${
                props.special
                    ? "bg-gradient-red font-montserrat font-bold text-title1 rounded-lg px-16 py-4 md:py-6 md:px-20 hover:bg-gradient-green focus:bg-gradient-green"
                    : "font-medium text-title1 px-10 py-3 bg-secondary-500 hover:bg-secondary-300 focus:bg-secondary-300 md:px-20 md:py-3"
            }`}
            onClick={props.onClick}
            type={props.type}
        >
            {props.text}
        </button>
    );
};

export default NPLButtonSquare;
