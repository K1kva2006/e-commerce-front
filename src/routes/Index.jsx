import { useEffect, useContext, useState } from "react";
import axios from "axios";
// components
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import ProductsLists from "../components/ProductsLists";
import GetProducts from "../components/GetProducts";

// popup
import SmartPhonesBrandsPopUp from "../popups/SmartPhonesBrandsPopUp";

import { Source } from "../App";

const Index = () => {
    const source = useContext(Source);
    const [reRender, setReRender] = useState(false);
    const [loading, setLoading] = useState(true); // დამატებულია loading მდგომარეობა

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/check/auth/token", {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                });

                if (res) {
                    source.setClientData(res.data);
                }
                setLoading(false); // დასრულია დამუშავება
            } catch (err) {
                console.log(err.message);
                setLoading(false); // დასრულია დამუშავება, შეცდომის დროსაც
            }
        };

        checkAuth();
    }, [source]);

    if (loading) {
        return <div>იტვირთება...</div>; // შეგიძლიათ შეცვალოთ ეს ტექსტი
    }

    return (
        <>
            <Header setState={setReRender} state={reRender} />
            <section className="pt-36 max-w-7xl w-full m-auto">
                <div className="flex items-center justify-between">
                    <aside
                        style={{ maxWidth: "410px"}}
                        className="w-full aside-shadow phone:w-72 small:w-44"
                    >
                        <div className="flex flex-col relative phone:flex-row">
                            <ProductsLists />
                            {source.mobilePhonesPopUpStatus && (
                                <SmartPhonesBrandsPopUp />
                            )}
                        </div>
                    </aside>

                    <div className="aside-shadow desktop-responsive ">
                        <ImageSlider />
                    </div>
                </div>
            </section>

            <section className="pt-28 pl-4 pr-34 max-w-7xl w-full m-auto grid grid-cols-1 ">
                <GetProducts setState={setReRender} state={reRender} />
            </section>
        </>
    );
};
export default Index;
