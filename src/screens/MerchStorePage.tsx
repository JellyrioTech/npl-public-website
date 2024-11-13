import NSPLButtonSquare from "../components/NPLButtonSquare";
import ArenaBattleSeries1 from "../assets/tshirt/ArenaBattleSeries1.png";
import nov13Tournament from "../assets/tshirt/nov13Tournament.png";

function MerchStorePage() {
    const products = [
        {
            url: "https://buy.stripe.com/fZedUbcl7dCE4Io3cd",
            name: "Arena Battle Series (Made in USA)",
            price: "$25",
            images: ArenaBattleSeries1,
        },
        {
            url: "https://buy.stripe.com/4gweYf98V568eiY5km",
            name: "Tournament Nov 13 (Made in USA)",
            price: "$30",
            images: nov13Tournament,
        },
    ];

    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <div className="py-14">
                <div className="flex flex-col justify-center items-center py-2">
                    <h2 className="uppercase font-regular text-regTitle lg:text-xlTitle font-light">
                        SUPPORT OUR JOURNEY
                    </h2>
                    <h1 className="uppercase font-bold text-5xl lg:text-[80px] font-display  leading-tight lg:leading-none">
                        MERCH STORE
                    </h1>
                </div>
                <div className="flex flex-col justify-center md:flex-row flex-wrap gap-16 py-16">
                    {products.map((product) => (
                        <div className="w-1/3 flex flex-col items-center justify-center gap-4">
                            <img
                                className="w-[285px] h-[285px] bg-cover p-5 border border-1"
                                src={product.images}
                            />
                            <h2 className="text-regTitle font-bold">
                                {product.name}
                            </h2>
                            <h3 className="text-lgBody">{product.price}</h3>
                            <NSPLButtonSquare
                                text={"Buy Now"}
                                type="button"
                                onClick={() =>
                                    window.open(
                                        `${product.url}`,
                                        "_blank",
                                        "noopener,noreferrer"
                                    )
                                }
                            ></NSPLButtonSquare>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MerchStorePage;
