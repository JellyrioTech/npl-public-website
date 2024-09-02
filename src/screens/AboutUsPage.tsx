const AboutUsPage = () => {
    return (
        <div className="w-full flex flex-col items-center space-y-8 mb-10">
            <section className="w-full bg-gradient-to-r from-primary-500 to-primary-900 text-center py-5">
                <p className="font-oswald font-bold text-4xl md:text-5xl text-neutral-100">
                    About Us
                </p>
            </section>
            <section className="w-[80%] md:max-w-[1200px] flex flex-col justify-center items-center">
                <div className="space-y-4 font-roboto">
                    <p>
                        Nesterin Pickleball League was established in 2024 in
                        Orlando, Florida, by me (Shubroto Debnath Shuvo) and my
                        wife (Brototi Biswas). My passion for Pickleball led me
                        to create this league for the community, so everyone can
                        enjoy challenging and fun games. I've loved playing
                        various sports since I was a kid. I played soccer,
                        cricket, badminton, table tennis, tennis, and now,
                        finally, pickleball. No matter what I work on, my
                        competitive mindset always takes over, and I'm a big fan
                        of competitive video games too. My wife and I, with our
                        Software Engineering experience, came up with this
                        pickleball league where we play and track all our
                        progress with the help of an app. Our vision for this
                        app is grand, and we'll steadily add new features to
                        make the game experience fun and interactive for all
                        players.
                    </p>
                    <p>
                        We aim to create high-quality tournaments and league
                        games that help players improve their skills. We have
                        different tournament formats, each challenging in its
                        own way, and players must prove their skills to become
                        champions or defenders in all the arenas we offer. With
                        the help of all the players and communities, we plan to
                        host tournaments and league games every month so players
                        can keep battling for their positions.
                    </p>
                    <p>
                        As always, we love to thank all our participants who
                        support and play in our tournaments. Our main goal is to
                        ensure everyone has a fun experience while challenging
                        their skills in every tournament we host. If you have
                        any questions, feel free to contact us!
                    </p>
                </div>
            </section>
            <section className="bg-neutral-100 w-full p-7 rounded-lg flex flex-col space-y-5 md:max-w-[800px]">
                <p className="font-oswald text-2xl font-bold md:text-3xl mb-4 md:mb-6 text-center text-primary-500 drop-shadow-sm">
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
            </section>
        </div>
    );
};

export default AboutUsPage;
