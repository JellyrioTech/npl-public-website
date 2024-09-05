const ErrorModal: React.FC = () => {
    return (
        <div className="fixed z-[300]">
            <div className="absolute w-[100vw] h-[100vh] bg-black bg-opacity-70 z-[300] flex justify-center items-center">
                <div className=" bg-white p-8 rounded-lg text-center">
                    <p>Requesting to server...</p>
                </div>
            </div>
        </div>
    );
};

export default Loader;
