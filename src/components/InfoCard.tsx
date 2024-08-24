import React from "react";

type CardProps = {
    label: string;
    content: string;
    cardColor?: string;
    borderColor?: string;
};

const InfoCard: React.FC<CardProps> = (props: CardProps) => {
    return (
        <div
            className={`flex flex-col items-center justify-center w-48 max-w-sm px-4 py-2 text-center rounded-lg shadow space-y-2 border-2 ${
                props.cardColor || "bg-tertiary-100"
            } ${props.borderColor || "border-tertiary-500"}`}
        >
            <p className="text-lg underline">{`${props.label}`}</p>
            <p className="font-bold uppercase">{`${props.content}`}</p>
        </div>
    );
};

export default InfoCard;
