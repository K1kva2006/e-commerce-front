import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import ProductList from "../components/ProductList";

import { Source } from "../App";

// PopUps
import AddProductPopUp from "../popups/AddProductPopUp";
import DeleteProductPopUp from "../popups/DeleteProductPopUp";
import AddAdminPopUp from "../popups/AddAdminPopUp";

// images
import addProductIcon from "../assets/add-product-icon.svg";
import deleteProductIcon from "../assets/trash-icon.svg";
import addAdminIcon from "../assets/add-admin-icon.svg";

const AdminPanel = () => {
    const source = useContext(Source);

    const navigateBack = useNavigate();
    useEffect(() => {
        return async () => {
            try {
                const res = await axios.get("/check/auth/token", {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                });

                if (!res.data.isAdmin) {
                    navigateBack("/");
                }
            } catch (err) {
                console.log(err.response);
            }
        };
    }, []);

    // funs

    const changeAddProductPopUpStatus = () => {
        !source.addProductPopUpStatus
            ? source.setAddProductPopUpStatus(true)
            : source.setAddProductPopUpStatus(false);

        source.setDeleteProductPopUpStatus(false);
        source.setAddAdminPopUpStatus(false);
    };

    const changeDeleteProductPopUpStatus = () => {
        !source.deleteProductPopUpStatus
            ? source.setDeleteProductPopUpStatus(true)
            : source.setDeleteProductPopUpStatus(false);

        source.setAddProductPopUpStatus(false);
        source.setAddAdminPopUpStatus(false);
    };

    const changeAddAdminPopUpStatus = () => {
        !source.addAdminPopUpStatus
            ? source.setAddAdminPopUpStatus(true)
            : source.setAddAdminPopUpStatus(false);

        source.setDeleteProductPopUpStatus(false);
        source.setAddProductPopUpStatus(false);
    };
    return (
        <>
            <Header />
            <section className="pt-28 max-w-7xl w-full  m-auto">
                <div className="flex justify-between flex-grow phone:flex-col">
                    <div>
                        <aside className=" max-w-xs w-full aside-shadow">
                            <ProductList
                                image={addProductIcon}
                                name={source.language.addProductList_Button}
                                fun={changeAddProductPopUpStatus}
                            />
                            <ProductList
                                image={deleteProductIcon}
                                name={source.language.deleteProductList_Button}
                                fun={changeDeleteProductPopUpStatus}
                            />
                            <ProductList
                                image={addAdminIcon}
                                name={source.language.addAdmin}
                                fun={changeAddAdminPopUpStatus}
                            />
                        </aside>
                    </div>
                    <div>
                        {source.addProductPopUpStatus && <AddProductPopUp />}
                        {source.deleteProductPopUpStatus && (
                            <DeleteProductPopUp />
                        )}
                        {source.addAdminPopUpStatus && <AddAdminPopUp />}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminPanel;
