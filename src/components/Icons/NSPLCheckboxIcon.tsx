import { ChangeEvent } from "react";

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
            className="mt-1 w-4 h-4 lg:w-6 lg:h-6 accent-secondary-300"
            required={props.isRequired}
        />
    );
};

export default NSPLCheckboxIcon;
