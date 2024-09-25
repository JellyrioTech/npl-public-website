import { ChangeEvent, ReactNode } from "react";

type CheckboxFieldProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
    isRequired?: boolean;
};

const NSPLCheckboxIcon: React.FC<CheckboxFieldProps> = (
    props: CheckboxFieldProps
) => {
    return (
        <input
            type="checkbox"
            onChange={props.onChange}
            checked={props.isChecked}
            className="w-6 h-6 accent-secondary-300"
            required={props.isRequired}
        />
    );
};

export default NSPLCheckboxIcon;
