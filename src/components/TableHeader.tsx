type tableHeaderProps = {
    headerNames: string[];
};

const TableHeader: React.FC<tableHeaderProps> = (props: tableHeaderProps) => {
    return (
        <thead className="text-xs lg:text-sm uppercase text-neutral-300 bg-primary-900">
            <tr>
                {props.headerNames.map((header) => (
                    <th scope="col" className="px-4 py-1.5 lg:px-6 lg:py-3">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
