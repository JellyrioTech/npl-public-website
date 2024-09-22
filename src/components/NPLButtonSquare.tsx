type ButtonProps = {
    onClick?: () => void;
    text: string;
    type?: "submit" | "button";
};

const NSPLButtonSquare: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className={`w-full text-neutral-100 font-medium text-smTitle lg:text-regTitle px-10 py-3 bg-secondary-500 hover:bg-secondary-300 focus:bg-secondary-300 lg:px-20 lg:py-3`}
            onClick={props.onClick}
            type={props.type}
        >
            {props.text}
        </button>
    );
};

export default NSPLButtonSquare;
