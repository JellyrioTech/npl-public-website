type ButtonProps = {
    onClick?: () => void;
    text: string;
    type?: "submit" | "button";
};

const NPLButtonSquare: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className={`text-neutral-100 font-medium text-regTitle px-10 py-3 bg-secondary-500 hover:bg-secondary-300 focus:bg-secondary-300 md:px-20 md:py-3`}
            onClick={props.onClick}
            type={props.type}
        >
            {props.text}
        </button>
    );
};

export default NPLButtonSquare;
