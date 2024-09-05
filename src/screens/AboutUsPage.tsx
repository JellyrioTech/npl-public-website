const AboutUsPage = () => {
    return (
        <>
            <div className="parent-container border-b-[1px] border-tertiary-100">
                <div className="flex flex-col items-center justify-center">
                    <p className="font-oswald text-5xl md:text-7xl text-tertiary-500 pb-14">
                        About Us
                    </p>
                    <p className="w-full md:w-1/3 px-10 md:px-0 text-center text-xl md:text-[20px] font-light md:font-extralight leading-[40px]">
                        Nesterin Pickleball League was established in 2024 in
                        Orlando, Florida, by me (Shubroto Debnath Shuvo) and my
                        wife (Brototi Biswas). My passion for Pickleball led me
                        to create this league for the community, so everyone can
                        enjoy challenging and fun games.{" "}
                    </p>
                </div>
            </div>

            <div className="parent-container border-b-[1px] border-tertiary-100">
                <div className="w-full md:max-w-[1200px] flex flex-col justify-center items-center">
                    <div className="space-y-4 font-roboto leading-loose">
                        <p>
                            I've loved playing various sports since I was a kid.
                            I played soccer, cricket, badminton, table tennis,
                            tennis, and now, finally, pickleball. No matter what
                            I work on, my competitive mindset always takes over,
                            and I'm a big fan of competitive video games too. My
                            wife and I, with our Software Engineering
                            experience, came up with this pickleball league
                            where we play and track all our progress with the
                            help of an app. Our vision for this app is grand,
                            and we'll steadily add new features to make the game
                            experience fun and interactive for all players.
                        </p>
                        <p>
                            We aim to create high-quality tournaments and league
                            games that help players improve their skills. We
                            have different tournament formats, each challenging
                            in its own way, and players must prove their skills
                            to become champions or defenders in all the arenas
                            we offer. With the help of all the players and
                            communities, we plan to host tournaments and league
                            games every month so players can keep battling for
                            their positions.
                        </p>
                        <p>
                            As always, we love to thank all our participants who
                            support and play in our tournaments. Our main goal
                            is to ensure everyone has a fun experience while
                            challenging their skills in every tournament we
                            host. If you have any questions, feel free to
                            contact us!
                        </p>
                    </div>
                </div>
            </div>

            <div className="parent-container">
                <div className="bg-neutral-200 p-8 rounded-lg flex flex-col justify-center items-center space-y-5 md:max-w-[800px]">
                    <p className="font-oswald text-lg md:text-4xl text-tertiary-500 pb-10">
                        Our Team
                    </p>
                    <div className="flex flex-col gap-5 justify-center items-center md:flex-row ">
                        <img
                            src="shuvo.jpg"
                            className="w-[250px] md:w-[35%] max-w-[300px] h-auto border-4 border-tertiary-700 rounded-md"
                        />
                        <img
                            src="meow.jpg"
                            className="w-[250px] md:w-[35%] max-w-[300px] h-auto border-4 border-tertiary-700 rounded-md"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsPage;
