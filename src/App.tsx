import "./App.css";
import NavBar from "./components/NavBar";
import jumbotronBG from "./assets/jumbotronBG.png";

function App() {
    return (
        <div className="bg-primary-900">
            <NavBar />

            <section className="relative w-full h-screen bg-neutral-100">
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${jumbotronBG})` }}
                >
                    <div className="mt-10 flex flex-col items-center gap-4">
                        <p className="font-oswald font-bold text-4xl md:text-5xl">
                            Arena Battle Series
                        </p>
                        <p className="py-2 md:px-5 bg-neutral-100 font-roboto text-[18px] md:text-[20px]">
                            Test your skills and write your own legacy
                        </p>
                        <button className="mt-4 md:mt-2 bg-secondary-500 rounded-full px-6 py-3 font-bold font-roboto hover:bg-secondary-300 focus:bg-secondary-300 md:px-10 md:py-3">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
