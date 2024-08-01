const ContactUsPage = () => {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center space-y-8 mb-10">
            <section className="w-full bg-gradient-to-r from-primary-500 to-primary-900 text-center py-5">
                <p className="font-oswald font-bold text-4xl md:text-5xl text-neutral-100">
                    Contact Us
                </p>
            </section>
            <section className="w-[80%] max-w-[700px]">
                <p>
                    Feel free to send us an email at{" "}
                    <span className="font-bold text-primary-500 font-roboto mt-4">
                        info@nesterin.com
                    </span>{" "}
                    if you have any questions regarding any of our tournaments
                    or any other informaton:
                </p>
            </section>
        </div>
    );
};

export default ContactUsPage;
