import { ChangeEvent, ReactNode } from "react";
import NSPLCheckboxIcon from "./Icons/NSPLCheckboxIcon";

type CheckboxProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
    children: ReactNode;
    isRequired?: boolean;
};

const NSPLCheckboxField: React.FC<CheckboxProps> = (props: CheckboxProps) => {
    return (
        <div className="flex gap-2 lg:gap-3 items-start">
            <NSPLCheckboxIcon
                onChange={props.onChange}
                isChecked={props.isChecked}
                isRequired={props.isRequired}
            ></NSPLCheckboxIcon>
            {props.children}
        </div>
    );
};

export default NSPLCheckboxField;
