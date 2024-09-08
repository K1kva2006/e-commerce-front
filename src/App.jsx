import { useState, createContext } from "react";
import { Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// routes
import Index from "./routes/Index";
import Cart from "./routes/Cart";
import AdminPanel from "./routes/AdminPanel";
import Product from "./routes/Product";
import PageNoteFound from "./routes/PageNotFound";

import languages from "./functions/languages";

axios.defaults.baseURL = "http://localhost:3069";

export const Source = createContext(null);

function App() {
    const [clientData, setClientData] = useState({});
    const [reRender, setReRender] = useState(false);

    const [language, setLanguage] = useState(languages[localStorage.getItem("language")]  || languages.EN)
    const [searchValue, setSearchValue] = useState("")

    const [products, setProducts] = useState([
        {
            productName: "Loading Product Name",
            productColor: "Loading Product Color",
            productPrice: "Loading Product Price",
            productImageUrl: "Loading Product Image",
        },
    ]);

    //popup satutus for global state

    const [authorizationPopUpStatus, setAuthorizationPopUpStatus] =
        useState(false);
    const [registerPopUpStatus, setRegisterPopUpStatus] = useState(false);


    const [addProductPopUpStatus, setAddProductPopUpStatus] = useState(false);
    const [deleteProductPopUpStatus, setDeleteProductPopUpStatus] = useState(false)
    const [addAdminPopUpStatus, setAddAdminPopUpStatus] = useState(false)

    const [mobilePhonesPopUpStatus, setMobilePhonesPopUpStatus] =
        useState(false);
    return (
        <>
            <Source.Provider
                value={{
                    clientData,
                    setClientData,
                    reRender,
                    setReRender,
                    language,
                    setLanguage,
                    searchValue,
                    setSearchValue,
                    products,
                    setProducts,
                    authorizationPopUpStatus,
                    setAuthorizationPopUpStatus,
                    registerPopUpStatus,
                    setRegisterPopUpStatus,
                    addProductPopUpStatus,
                    deleteProductPopUpStatus,
                    setDeleteProductPopUpStatus,
                    addAdminPopUpStatus,
                    setAddAdminPopUpStatus,
                    setAddProductPopUpStatus,
                    mobilePhonesPopUpStatus,
                    setMobilePhonesPopUpStatus,
                }}
            >
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin/panel" element={<AdminPanel />} />
                    <Route path="/product/:productId" element={<Product />} />

                    <Route path="*" element={<PageNoteFound />} />
                </Routes>
            </Source.Provider>
        </>
    );
}

export default App;
