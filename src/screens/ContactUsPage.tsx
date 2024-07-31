const ContactUsPage = () => {
    return (
        <div className="w-[80%] md:max-w-[800px] mx-auto mt-5 leading-6 font-roboto mb-8">
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold font-roboto text-3xl text-tertiary-700">
                    Contact us
                </h1>
                <p>
                    Feel free to send us an email if you have any questions
                    regarding any of our tournaments or anything
                </p>
                <h2 className="font-bold text-primary-500 font-roboto">
                    info@nesterin.com
                </h2>
                <div className="h-[60vh]"></div>
            </div>
        </div>
    );
};

export default ContactUsPage;
