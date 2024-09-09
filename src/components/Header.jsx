import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { Source } from "../App";
// components/popups
import AuthorizationPopUp from "../popups/AuthorizationPopUp";
import RegisterPopUp from "../popups/RegisterPopUp";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

// images
import searchIcon from "../assets/search-icon.svg";

const Header = ({ setState, state }) => {
    const source = useContext(Source);

    const [isLogin, setIsLogin] = useState();
    const [loading, setLoading] = useState(true); // დამატებული loading მდგომარეობა
    const [cartProductCount, setCartProductCount] = useState(0);
    const routeLocation = useLocation();
    const navigateBack = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/check/auth/token", {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                });
                setIsLogin(true);
            } catch (err) {
                setIsLogin(false);
                if (
                    routeLocation.pathname === "/admin/panel" ||
                    routeLocation.pathname === "/cart"
                ) {
                    navigateBack("/");
                }
            }
        };

        const fetchCartProducts = async () => {
            try {
                const res = await axios.get("/get/cart/products", {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                });
                setCartProductCount(res.data.productsCart);
            } catch (err) {
                console.log(err);
            }
        };

        const loadData = async () => {
            await checkAuth();
            await fetchCartProducts();
            setLoading(false); // დასრულია API მოთხოვნები
        };

        loadData();
    }, [state, routeLocation, navigateBack]);

    if (loading) {
        return <div>იტვირთება...</div>; // რენდერი დაიჭერს "იტვირთება..." სანამ მოთხოვნები დასრულდება
    }

    return (
        <>
            <header className="fixed w-full h-20 bg-slate-200 z-50">
                <div className="flex flex-col">
                    <div className="p-4 flex justify-between  left-1/2 fixed  -translate-x-2/4 max-w-7xl w-full  m-auto">
                        <h1 className="mt-2 text-2xl">Kikva's Shop</h1>

                        <div id="forComputers" className="desktop-responsive">
                            <DesktopNav isLogin={isLogin} cartProductCount={cartProductCount} />
                        </div>

                        <div id="forMobiles" className="mobile-responsive">
                            <MobileNav isLogin={isLogin} cartProductCount={cartProductCount} />
                        </div>
                    </div>
                    <div />

                    <div className="w-full flex justify-center absolute top-24">
                        {routeLocation.pathname === "/" && (
                            <div className="pl-2 pr-3 max-w-96 w-full flex bg-slate-200">
                                <img src={searchIcon} alt="searchIcon" />

                                <input
                                    type="search"
                                    value={source.searchValue}
                                    onChange={(e) =>
                                        source.setSearchValue(e.target.value)
                                    }
                                    placeholder={
                                        source.language.searchInputPlaceHolder
                                    }
                                    className="p-1.5 w-80 bg-slate-200 outline-none "
                                />

                                <button
                                    onClick={() => {
                                        let searchValueLowerCase =
                                            source.searchValue.toLowerCase();
                                        const filteredProducts =
                                            source.products.filter((item) => {
                                                return item.productName
                                                    .toLowerCase()
                                                    .includes(
                                                        searchValueLowerCase
                                                    );
                                            });
                                        if (
                                            source.searchValue.trim().length < 1
                                        ) {
                                            window.location.reload();
                                        } else if (
                                            filteredProducts.length < 1
                                        ) {
                                            alert("Product Not Found");
                                            source.setSearchValue("");
                                            window.location.reload();
                                        } else if (
                                            filteredProducts.length >= 1
                                        ) {
                                            source.setProducts(
                                                filteredProducts
                                            );
                                            window.scrollTo({
                                                top: 600,
                                                behavior: "smooth",
                                            });
                                        }
                                    }}
                                    className="p-2 font-bold"
                                >
                                    {source.language.searchInputButton}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="w-96 absolute top-96 left-1/2 -translate-y-1/2 z-40">
                {source.authorizationPopUpStatus && <AuthorizationPopUp />}
                {source.registerPopUpStatus && <RegisterPopUp />}
            </div>
        </>
    );
};

export default Header;

