import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Source } from "../App";

import cartIcon from "../assets/cart-icon.svg";

const GetProducts = ({ setState, state }) => {
    const source = useContext(Source);
    const navigateProductById = useNavigate();
    const [loading, setLoading] = useState(true); // დამატებულია loading მდგომარეობა

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("/get/all/products");
                source.setProducts(res.data);
                setLoading(false); // დასრულების შემდეგ loading მდგომარეობა false ხდება
            } catch (err) {
                console.log(err.response.data);
                setLoading(false); // შეცდომის შემთხვევაშიც loading false ხდება
            }
        };

        fetchProducts(); // გამოძახება
    }, [source]);

    if (loading) {
        return <div>იტვირთება...</div>; // ჩასვით თქვენთვის სასურველი ტექსტი
    }

    return (
        <>
            <div className="h-72  w-full flex flex-wrap gap-10">
                {source.products.map((product, index) => {
                    const {
                        productName,
                        productColor,
                        productPrice,
                        productImageUrl,
                        _id,
                    } = product;
                    return (
                        <div
                            key={index}
                            onClick={(e) => {
                                if (e.target.tagName !== "BUTTON") {
                                    navigateProductById(
                                        "/product/" + product._id
                                    );
                                }
                            }}
                            className="flex flex-col items-center gap-1 cursor-pointer"
                        >
                            <img
                                src={`${axios.defaults.baseURL}/products/${productImageUrl}`}
                                alt={productName}
                                className="w-36 mb-2"
                                loading="lazy"
                            />
                            <div className="max-w-48 w-full mb-2 flex flex-col gap-1">
                                <span className="p-2 text-center font-bold break-words bg-lime-400 border-radius-1 ">
                                    {source.language.bestPrice}
                                </span>
                                <p className="max-w-56 w-full font-bold break-words">
                                    {productPrice}{" "}
                                    <span className="text-blue-800">
                                        {" "}
                                        L-Coin
                                    </span>
                                </p>
                                <h3 className="h-14 max-w-36 w-full font-bold break-words">
                                    {productName + " " + productColor}
                                </h3>
                            </div>
                            <div
                                className="pl-2 pr-2 flex bg-orange-400"
                                style={{ borderRadius: "6px" }}
                            >
                                <img src={cartIcon} alt="cartIcon" />

                                <button
                                    onClick={async (e) => {
                                        try {
                                            setTimeout(() => {
                                                !state
                                                    ? setState(true)
                                                    : setState(false);
                                            }, 1500);
                                            const res = await axios.post(
                                                "/add/product/cart",
                                                {
                                                    productId: _id,
                                                },
                                                {
                                                    headers: {
                                                        "x-auth-token":
                                                            localStorage.getItem(
                                                                "authToken"
                                                            ),
                                                    },
                                                }
                                            );
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    }}
                                    className="p-3 text-base"
                                >
                                    {localStorage.getItem("authToken") &&
                                        source.language.addToCart}
                                    {!localStorage.getItem("authToken") &&
                                        source.language.authorizationFirst}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default GetProducts;
