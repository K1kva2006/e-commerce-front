import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Source } from "../App";

import Header from "../components/Header";

import trashIcon from "../assets/trash-icon.svg";

const Cart = () => {
    const source = useContext(Source);
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true); // დამატებული loading მდგომარეობა
    const [resCartProductDelete, setResCartProductDelete] = useState("");
    const [reRender, setReRender] = useState(false);

    let totalCartProductsPrice = 0;
    const navigateBack = useNavigate();
    const navigateProductById = useNavigate();

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const res = await axios.get("/get/user/cart/products", {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                });
                setCartProducts(res.data);
                setTimeout(() => setResCartProductDelete(""), 1000);
            } catch (err) {
                navigateBack("/");
                console.log(err);
            }
            setLoading(false); // მონაცემების ჩატვირთვის დასრულება
        };

        fetchCartProducts();
    }, [reRender, navigateBack]);

    if (loading) {
        return <div>იტვირთება...</div>; // "იტვირთება..." ტექსტი რენდერის დროს
    }

    return (
        <>
            <Header />
            <section className="pt-28 max-w-7xl w-full  m-auto">
                <div className="w-full flex justify-between gap-20 phone:flex-col phone:p-4">
                    <div className="w-full flex flex-col gap-6">
                        {cartProducts.map((product, index) => {
                            const {
                                productName,
                                productColor,
                                productPrice,
                                productImageUrl,
                                _id,
                            } = product;
                            totalCartProductsPrice += Number(productPrice);
                            return (
                                <div
                                    onClick={(e) => {
                                        if (
                                            e.target.tagName !== "BUTTON" &&
                                            e.target.tagName !== "IMG"
                                        ) {
                                            navigateProductById(
                                                "/product/" + product._id
                                            );
                                        }
                                    }}
                                    key={index}
                                    className="p-2 flex gap-3 border-radius-1 bg-slate-200 cursor-pointer"
                                >
                                    <img
                                        src={
                                            axios.defaults.baseURL +
                                            "/products/" +
                                            productImageUrl
                                        }
                                        alt={productName}
                                        className="w-28 border-radius-1 bg-white"
                                    />
                                    <div className="flex w-full">
                                        <div className="flex flex-col justify-between">
                                            <h3 className="w-48 break-words text-slate-600 font-bold">
                                                {productName} {productColor}
                                            </h3>
                                            <span className="text-blue-800 font-bold">
                                                {productPrice} L-Coin
                                            </span>
                                        </div>

                                        <div className="w-3/4 flex justify-end items-center">
                                            <img
                                                src={trashIcon}
                                                alt="Remove the product"
                                                onClick={async () => {
                                                    try {
                                                        const res =
                                                            await axios.delete(
                                                                "/delete/cart/product",
                                                                {
                                                                    headers: {
                                                                        "x-auth-token":
                                                                            localStorage.getItem(
                                                                                "authToken"
                                                                            ),
                                                                    },
                                                                    data: {
                                                                        productId:
                                                                            _id,
                                                                    },
                                                                }
                                                            );
                                                        !reRender
                                                            ? setReRender(true)
                                                            : setReRender(
                                                                  false
                                                              );
                                                        setResCartProductDelete(
                                                            res.data
                                                        );
                                                    } catch (err) {
                                                        setResCartProductDelete(
                                                            err.response.data
                                                        );
                                                    }
                                                }}
                                                className="hover:bg-slate-300 border-radius-1 p-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <span className="font-bold text-xl text-green-500">
                            {resCartProductDelete}
                        </span>
                    </div>

                    <div className="p-6 max-w-96 w-full h-96 gap-20 border-radius-1 bg-slate-200">
                        <div className="flex flex-col gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold">
                                    {source.language.total}{" "}
                                    <span className="text-blue-800">
                                        {" "}
                                        {totalCartProductsPrice || 0} L-Coin
                                    </span>
                                </h3>
                            </div>

                            <div>
                                <button
                                    onClick={() => alert("Goood boooy")}
                                    className="p-2.5 pl-5 pr-5 font-bold text-xl bg-green-600 border-radius-1 hover:opacity-80"
                                >
                                    {source.language.buyNow}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;

