import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const TournamentRegistrationBaseContainer: React.FC<Props> = (props: Props) => {
    return (
        <div className="w-full max-w-[1200px] mx-auto py-7 lg:py-10">
            <div className="w-[90%] mx-auto lg:w-[960px] py-7 px-10 lg:py-10 lg:px-14 bg-neutral-300">
                {props.children}
            </div>
        </div>
    );
};

export default TournamentRegistrationBaseContainer;
