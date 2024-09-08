import { useRef, useState, useContext } from "react";
import axios from "axios";

import { Source } from "../App";

const AddProductPopUp = () => {
    const source = useContext(Source);

    const [productTitle, setProductTitle] = useState("");
    const [productColor, setProductColor] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productBrand, setProductBrand] = useState("");

    const [productImage, setProductImage] = useState();
    const [productImageUrl, setProductImageUrl] = useState();

    const [resMessage, setResMessage] = useState("");
    const messageRef = useRef(null);

    const changeValue = (e, changeFun) => {
        changeFun(e.target.value);
    };

    return (
        <>
            <div className="m-5 p-5 w-100 aside-shadow phone:w-80">
                <h1 className="text-3xl phone:text-2xl">{source.language.createProduct}</h1>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="p-3 flex flex-col items-center gap-5 "
                >
                    <div className="flex gap-3">
                        <label htmlFor="productBrand" className="text-xl phone:text-sm">
                            {source.language.productBrand}
                        </label>
                        <input
                            type="text"
                            id="productBrand"
                            required
                            value={productBrand}
                            onChange={(e) => changeValue(e, setProductBrand)}
                            className="p-1 border-input"
                        />
                    </div>

                    <div className="flex gap-3">
                        <label htmlFor="productTitle" className="text-xl phone:text-sm">
                            {source.language.productTitle}
                        </label>
                        <input
                            type="text"
                            id="productTitle"
                            required
                            value={productTitle}
                            onChange={(e) => changeValue(e, setProductTitle)}
                            className="p-1 border-input"
                        />
                    </div>

                    <div className="flex gap-3">
                        <label htmlFor="productColor" className="text-xl phone:text-sm">
                            {source.language.productColor}
                        </label>
                        <input
                            type="text"
                            id="productColor"
                            required
                            value={productColor}
                            onChange={(e) => changeValue(e, setProductColor)}
                            className="p-1 border-input"
                        />
                    </div>

                    <div className="flex gap-3">
                        <label htmlFor="productPrice" className="text-xl phone:text-sm">
                            {source.language.productPrice}
                        </label>
                        <input
                            type="number"
                            id="productPrice"
                            required
                            value={productPrice}
                            onChange={(e) => changeValue(e, setProductPrice)}
                            className="p-1 border-input"
                        />
                    </div>

                    <div className="flex gap-3">
                        <label htmlFor="productImage" className="text-xl phone:text-sm">
                            {source.language.productImage}
                        </label>
                        <input
                            type="file"
                            id="productImage"
                            required
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setProductImageUrl(file.name);

                                const formData = new FormData();
                                formData.append("file", file);
                                setProductImage(formData);
                            }}
                        />
                    </div>

                    <button
                        onClick={async () => {
                            try {
                                const productDataRes = await axios.post(
                                    "/add/product/data",
                                    {
                                        productBrand,
                                        productName: productTitle,
                                        productColor,
                                        productPrice,
                                        productImageUrl,
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

                                const productImageRes = await axios.post(
                                    "/add/product/image",
                                    productImage,
                                    {
                                        headers: {
                                            "x-auth-token":
                                                localStorage.getItem(
                                                    "authToken"
                                                ),
                                        },
                                    }
                                );
                                setResMessage(productDataRes.data);
                                messageRef.current.style.color = "green";
                                setProductBrand("");
                                setProductTitle("");
                                setProductColor("");
                                setProductPrice(0);
                                setProductImageUrl("");
                                setProductImage();
                            } catch (err) {
                                setResMessage(err.response.data);
                                messageRef.current.style.color = "red";
                            }
                        }}
                        className="border-button p-2 hover:bg-slate-100 phone:text-sm"
                    >
                        {source.language.addProductList_Button}
                    </button>
                    <span ref={messageRef}>{resMessage}</span>
                </form>
            </div>
        </>
    );
};

export default AddProductPopUp;
