const AboutUsPage = () => {
    return (
        <div className="w-[80%] md:max-w-[800px] mx-auto mt-5 leading-6 font-roboto mb-8">
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold font-roboto text-3xl text-tertiary-700">
                    About Us
                </h1>
                <p>
                    Nesterin Pickleball League was established in 2024 in
                    Orlando, Florida, by me (Shubroto Debnath Shuvo) and my wife
                    (Brototi Biswas). My passion for Pickleball led me to create
                    this league for the community, so everyone can enjoy
                    challenging and fun games.
                </p>
                <p>
                    I've loved playing various sports since I was a kid. I
                    played soccer, cricket, badminton, table tennis, tennis, and
                    now, finally, pickleball. No matter what I work on, my
                    competitive mindset always takes over, and I'm a big fan of
                    competitive video games too.
                </p>
                <p>
                    My wife and I, with our Software Engineering experience,
                    came up with this pickleball league where we play and track
                    all our progress with the help of an app. Our vision for
                    this app is grand, and we'll steadily add new features to
                    make the game experience fun and interactive for all
                    players.
                </p>
                <p>
                    We aim to create high-quality tournaments and league games
                    that help players improve their skills. We have different
                    tournament formats, each challenging in its own way, and
                    players must prove their skills to become champions or
                    defenders in all the arenas we offer.
                </p>
                <p>
                    With the help of all the players and communities, we plan to
                    host tournaments and league games every month so players can
                    keep battling for their positions.
                </p>
                <p>
                    As always, we love to thank all our participants who support
                    and play in our tournaments. Our main goal is to ensure
                    everyone has a fun experience while challenging their skills
                    in every tournament we host. If you have any questions, feel
                    free to contact us!
                </p>

                <h2 className="font-bold font-roboto text-2xl text-tertiary-700">
                    Our Team
                </h2>
                <div className="flex gap-5 flex-wrap">
                    <img
                        src="shuvo.jpg"
                        className="w-[300px] h-auto border-4 border-tertiary-700 rounded-md"
                    />
                    <img
                        src="meow.jpg"
                        className="w-[300px] h-auto border-4 border-tertiary-700 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
