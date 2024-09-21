import classNames from "classnames";

type ButtonProps = {
    onClick?: () => void;
    text: string;
    classes?: string;
    type?: "submit" | "button";
};

const NPLButton: React.FC<ButtonProps> = (props) => {
    const buttonClasses = classNames(
        "mt-4 md:mt-2 bg-secondary-500 text-neutral-100 rounded-full px-6 py-3 font-bold font-roboto drop-shadow-md hover:bg-secondary-300 focus:bg-secondary-300 md:px-10 md:py-3",
        props.classes
    );
    return (
        <button
            className={buttonClasses}
            onClick={props.onClick}
            type={props.type}
        >
            {props.text}
        </button>
    );
};

export default NPLButton;
