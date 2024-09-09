import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Source } from "../App";

import Header from "../components/Header";

const Product = () => {
    const source = useContext(Source)

    const loc = useLocation()
    const { productId } = useParams();

    const [product, setProduct] = useState([]);
    const [productStatusErr, setProdcutStatusErr] = useState(false);
    const navigateBack = useNavigate();
    useEffect(() => {
        return async () => {
            try {
                const productRes = await axios.post("/get/product", {
                    productId,
                });
                setProduct(productRes.data);
            } catch (err) {
                setProdcutStatusErr(err.response.data);
            }
        };
    }, []);

    return (
        <>
            <Header />

            {productStatusErr && (
                <div className="flex w-full flex-col justify-center ">
                    <h1 className="pt-56 text-center text-3xl text-red-600 font-bold">
                        Product does not exist
                    </h1>
                    <button
                        onClick={() => navigateBack("/")}
                        className="pt-8 text-center text-2xl text-red-600 font-bold"
                    >
                        {source.language.goBack}
                    </button>
                </div>
            )}
            <section className="pt-36 max-w-7xl w-full m-auto ">
                <div className="flex justify-between  tablet:flex-col tablet:items-center">
                    <div className="flex flex-col gap-1 justify-center">
                        <div>
                            <h2 className="text-xl font-bold">
                                {product.productName +
                                    " " +
                                    product.productColor}
                            </h2>
                        </div>
                        <div>
                            <img
                                src={`${axios.defaults.baseURL}/products/${product.productImageUrl}`}
                                alt={product.productName}
                                className="w-96"
                            />
                        </div>
                    </div>
                    <div className="p-6 flex flex-col bg-red-50 w-100 h-96 gap-6 tablet:w-96">
                        <h3 className="text-2xl">
                            {source.language.productPrice}: {product.productPrice}{" "}
                            <span className="text-blue-800">L-Coin</span>
                        </h3>
                        <div className="flex flex-col justify-center items-center gap-5">
                            <button
                                onClick={() => alert("GOOOOD BOOOOYYYY")}
                                className="w-full pt-3 pb-3 text-xl border-radius-1 bg-orange-400 cursor-pointer"
                            >
                                {source.language.buy}
                            </button>
                            <button
                                onClick={() => navigateBack("/")}
                                className="w-3/4 pt-2 pb-2 text-xl border-radius-1 bg-red-500 cursor-pointer"
                            >
                                {source.language.goBack}
                            </button>
                            <button
                                onClick={() => navigateBack("/cart")}
                                className="w-3/4 pt-2 pb-2 text-xl border-radius-1 bg-red-500 cursor-pointer"
                            >
                                {source.language.returnToCart}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
