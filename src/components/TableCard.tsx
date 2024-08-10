type CardProps = {
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    onClick: (name: string) => void;
};

const TableCard: React.FC<CardProps> = (props: CardProps) => {
    return (
        <div
            className="p-6 bg-primary-900 rounded-lg cursor-pointer shadow-md hover:bg-primary-700 flex"
            onClick={() => props.onClick(props.name)}
        >
            <p className="basis-1/3 font-bold text-lg uppercase text-neutral-100">
                {props.name}
            </p>
            <div className="">
                <p className="text-neutral-300">Address: {props.address}</p>
                <p className="text-neutral-300">
                    {props.city}, {props.state}, {props.zipcode}
                </p>
            </div>
        </div>
    );
};

export default TableCard;
