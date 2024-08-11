import classNames from "classnames";

type CardHeaderProps = {
    header: string | undefined;
    type: "h1" | "h2" | "h3";
    className?: string;
};

const CardHeader: React.FC<CardHeaderProps> = (props: CardHeaderProps) => {
    function getTextClass() {
        switch (props.type) {
            case "h1":
                return "text-2xl font-bold";
                break;
            case "h2":
                return "text-xl font-semibold";
                break;
            case "h3":
                return "text-lg font-semibold";
                break;
        }
    }

    return (
        <div className={`${classNames} inline-block`}>
            <p className={getTextClass()}>{props.header}</p>
            <hr className="border-2 border-secondary-700" />
        </div>
    );
};

export default CardHeader;
