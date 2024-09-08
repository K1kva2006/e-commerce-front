import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


import { Source } from "../App";
// components/popups


import languages from "../functions/languages";

// images
import cartIcon from "../assets/cart-icon.svg";
import backArrowIcon from "../assets/back-arrow-icon.svg";
import adminPanelIcon from "../assets/admin-panel-icon.svg";

const DesktopNav = ({isLogin, cartProductCount}) => {
    const source = useContext(Source);
    const routeLocation = useLocation();
    const navigateBack = useNavigate();
    return (
        <>
            <nav className="flex items-center gap-20">
                {isLogin && routeLocation.pathname === "/" && (
                    <div className="flex gap-2 p-2 bg-white border-button">
                        <span>{cartProductCount.length}</span>
                        <img src={cartIcon} alt="cartIcon" />
                        <Link to="/cart" className="text-xl">
                            {source.language.cart}
                        </Link>
                    </div>
                )}
                {source.clientData.isAdmin &&
                    (routeLocation.pathname === "/" ||
                        routeLocation.pathname === "/cart") && (
                        <div className="flex gap-2 p-2 bg-white border-button">
                            <img src={adminPanelIcon} alt="adminPanelIcon" />
                            <Link
                                to="/admin/panel"
                                className="text-xl"
                                style={{
                                    wordBreak: "keep-all",
                                }}
                            >
                                {source.language.adminPanel}
                            </Link>
                        </div>
                    )}

                {isLogin &&
                    (routeLocation.pathname === "/cart" ||
                        routeLocation.pathname === "/admin/panel") && (
                        <div className="flex gap-2 p-2 bg-white border-button">
                            <img src={backArrowIcon} alt="backArrow" />
                            <Link to="/" className="text-xl">
                                {source.language.back}
                            </Link>
                        </div>
                    )}

                {!isLogin && (
                    <div className="flex gap-5">
                        <button
                            onClick={() => {
                                if (!source.authorizationPopUpStatus) {
                                    source.setRegisterPopUpStatus(false);
                                    source.setAuthorizationPopUpStatus(true);
                                } else {
                                    source.setAuthorizationPopUpStatus(false);
                                }
                            }}
                            className="text-xl p-2 bg-white border-button"
                        >
                            {source.language.authorization}
                        </button>
                        <div className="w-0.5 h-12 bg-black"></div>
                        <button
                            onClick={() => {
                                if (!source.registerPopUpStatus) {
                                    source.setAuthorizationPopUpStatus(false);
                                    source.setRegisterPopUpStatus(true);
                                } else {
                                    source.setRegisterPopUpStatus(false);
                                }
                            }}
                            className="text-xl p-2 bg-white border-button"
                        >
                            {source.language.register}
                        </button>
                    </div>
                )}
                {isLogin && (
                    <div>
                        <button
                            onClick={() => {
                                localStorage.removeItem("authToken");
                                window.location.reload();
                            }}
                            className="text-xl p-2 bg-white border-button"
                        >
                            {source.language.signOut}
                        </button>
                    </div>
                )}

                <button
                    onClick={() => {
                        if (source.language.language === "KA") {
                            source.setLanguage(languages.KA);
                            localStorage.setItem("language", "KA");
                        } else if (source.language.language === "EN") {
                            source.setLanguage(languages.EN);
                            localStorage.setItem("language", "EN");
                        }
                    }}
                    className="text-xl p-2 bg-white border-button"
                >
                    {source.language.language}
                </button>
            </nav>
        </>
    );
};

export default DesktopNav;
