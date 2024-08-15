import { ReactNode } from "react";

type Props = { children: ReactNode; innerStyle?: string };

const BaseContent: React.FC<Props> = ({ children, innerStyle }) => {
    return (
        <div className="w-full bg-primary-900 min-h-screen flex flex-col items-center">
            <div className={`w-[90%] md:max-w-[1200px] py-5 ${innerStyle}`}>
                {children}
            </div>
        </div>
    );
};

export default BaseContent;
