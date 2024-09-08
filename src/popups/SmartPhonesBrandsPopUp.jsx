import { useContext } from "react";
import axios from "axios";
import { Source } from "../App";

const SmartPhonesBrandsPopUp = () => {
    const source = useContext(Source);

    const scrollToCoordinates = () => {
        window.scrollTo({
            top: 610,
            left: 0,
            behavior: "smooth",
        });
    };

    const getProductsByBrand = async (brand) => {
        try {
            const products = await axios.post("/get/products/brand", {
                brand,
            });
            source.setProducts(products.data);
        } catch (err) {
            console.log(err.response.message);
        }
    };

    return (
        <>
            <div className=" absolute left-100 p-4 top-5 max-w-80 w-full h-96 border-radius-1 bg-gray-100  phone:left-80 phone:max-w-60 small:left-48 small:p-2 small:w-36">
                <h3 className="text-bold text-2xl text-center mb-5 cursor-default phone:text-xl small:text-sm">
                    {source.language.brands}
                </h3>
                <ul className="flex flex-col items-center gap-2">
                    <li
                        onClick={async () => {
                            try {
                                const res =
                                    await axios.get("/get/all/products");
                                source.setProducts(res.data);
                            } catch (err) {
                                console.log(err.response.data);
                            }
                            scrollToCoordinates();
                        }}
                        className="text-xl text-slate-500 font-bold cursor-pointer hover:opacity-70 phone:text-sm"
                    >
                        All
                    </li>
                    <li
                        onClick={() => {
                            getProductsByBrand("Apple");
                            scrollToCoordinates();
                        }}
                        className="text-xl text-slate-500 font-bold cursor-pointer hover:opacity-70 phone:text-sm"
                    >
                        Apple
                    </li>
                    <li
                        onClick={() => {
                            getProductsByBrand("Samsung");
                            scrollToCoordinates();
                        }}
                        className="text-xl text-slate-500 font-bold cursor-pointer hover:opacity-70 phone:text-sm"
                    >
                        Samsung
                    </li>
                    <li
                        onClick={() => {
                            getProductsByBrand("Google");
                            scrollToCoordinates();
                        }}
                        className="text-xl text-slate-500 font-bold cursor-pointer hover:opacity-70 phone:text-sm"
                    >
                        Google
                    </li>
                    <li
                        onClick={() => {
                            getProductsByBrand("Xiaomi");
                            scrollToCoordinates();
                        }}
                        className="text-xl text-slate-500 font-bold cursor-pointer hover:opacity-70 phone:text-sm"
                    >
                        Xiaomi
                    </li>
                    <li className="text-xl text-slate-500 font-bold cursor-pointer hover:opacity-70"></li>
                    <li className="text-xl text-slate-500 font-bold cursor-pointer hover:opacity-70"></li>
                </ul>
            </div>
        </>
    );
};

export default SmartPhonesBrandsPopUp;
