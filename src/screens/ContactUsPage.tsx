const ContactUsPage = () => {
    return (
        <div className="parent-container">
            <div className="w-full lg:max-w-[1200px] px-10 lg:px-0 flex flex-col justify-center items-center">
                <p className="font-oswald text-5xl lg:text-7xl text-tertiary-500 pb-14">
                    Contact Us
                </p>
                <p>
                    if you have any questions regarding any of our tournaments
                    or any other information, feel free to send us an email at{" "}
                    <span className="font-bold text-primary-500 font-roboto mt-4">
                        info@nesterin.com{" "}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ContactUsPage;
