import "./App.css";
import NavBar from "./components/NavBar";
import jumbotronBG from "./assets/jumbotronBG.png";

function App() {
    return (
        <div className="bg-primary-900 min-h-screen">
            <NavBar />

            <section className="relative w-full bg-neutral-100">
                <img
                    src={jumbotronBG}
                    className="w-full h-screen object-contain"
                />
                <div className="absolute inset-0 flex flex-col justify-start items-center py-6 gap-4">
                    <p className="font-oswald font-bold text-4xl md:text-5xl">
                        Arena Battle Series
                    </p>
                    <p className="py-1 md:py-2 bg-neutral-100 font-roboto">
                        Test your skills and write your own legacy
                    </p>
                    <button className="mt-4 md:mt-2 bg-secondary-500 rounded-lg px-3 py-2 font-bold font-roboto hover:bg-secondary-300 focus:bg-secondary-300">
                        Learn More
                    </button>
                </div>
            </section>

            <div className="max-w-[1200px] h-screen mx-auto"></div>
        </div>
    );
}

export default App;
