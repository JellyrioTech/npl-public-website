import { ChangeEvent } from "react";

type InputFieldProps = {
    type: "text" | "password" | "email";
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isDisabled?: boolean;
};

const InputField: React.FC<InputFieldProps> = (props) => {
    return (
        <div className="space-y-3">
            <label className="text-gray-600 font-semibold">
                {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            </label>
            <input
                type={props.type}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className="border-b-2 border-primary-500 px-4 py-2 outline-none rounded-md w-full"
                required={props.isRequired}
                disabled={props.isDisabled}
            />
        </div>
    );
};

export default InputField;
