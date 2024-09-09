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
    
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/check/auth/token", {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                });

                if (!res.data.isAdmin) {
                    navigateBack("/");
                } else {
                    setLoading(false); // Set loading to false after successful check
                }
            } catch (err) {
                console.log(err.response);
                navigateBack("/"); // Navigate to home if there's an error
            }
        };

        checkAuth(); // Call the async function
    }, [navigateBack]);

    // Functions to handle pop-up status changes
    const changeAddProductPopUpStatus = () => {
        source.setAddProductPopUpStatus(!source.addProductPopUpStatus);
        source.setDeleteProductPopUpStatus(false);
        source.setAddAdminPopUpStatus(false);
    };

    const changeDeleteProductPopUpStatus = () => {
        source.setDeleteProductPopUpStatus(!source.deleteProductPopUpStatus);
        source.setAddProductPopUpStatus(false);
        source.setAddAdminPopUpStatus(false);
    };

    const changeAddAdminPopUpStatus = () => {
        source.setAddAdminPopUpStatus(!source.addAdminPopUpStatus);
        source.setDeleteProductPopUpStatus(false);
        source.setAddProductPopUpStatus(false);
    };

    // Don't render the main content until loading is finished
    if (loading) {
        return <div>Loading...</div>; // You can customize this loading screen
    }

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
                        {source.deleteProductPopUpStatus && <DeleteProductPopUp />}
                        {source.addAdminPopUpStatus && <AddAdminPopUp />}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminPanel;

