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

const NSPLInputField: React.FC<InputFieldProps> = (props) => {
    return (
        <div className="flex flex-col">
            <label className="uppercase font-regular text-[10px] text-neutral-700 mb-1">
                {props.name}
            </label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                className={`py-2 ${
                    props.isDisabled
                        ? "bg-neutral-300 text-neutral-900 pl-2"
                        : "bg-transparent text-neutral-700"
                }  text-lgBody font-regular `}
                value={props.value}
                onChange={props.onChange}
                required={props.isRequired}
                disabled={props.isDisabled}
            ></input>
            <hr />
        </div>
    );
};

export default NSPLInputField;
