type ModalProps = {
    children: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
};

const ModalWithBackdrop: React.FC<ModalProps> = (props: ModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {props.children}
                <div className="flex justify-center gap-2">
                    <button
                        onClick={props.onCancel}
                        className="mt-4 px-6 py-2 bg-tertiary-300 text-white rounded hover:bg-secondary-500"
                    >
                        No
                    </button>
                    <button
                        onClick={props.onConfirm}
                        className="mt-4 px-6 py-2 bg-tertiary-300 text-white rounded hover:bg-secondary-500"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalWithBackdrop;
