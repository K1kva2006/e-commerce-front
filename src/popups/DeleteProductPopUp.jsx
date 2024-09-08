import { useRef, useState, useContext } from "react";
import axios from "axios";

import { Source } from "../App";

const DeleteProductPopUp = () => {
    const source = useContext(Source);

    const [productId, setProductId] = useState("");

    const [resMessage, setResMessage] = useState("");
    const messageRef = useRef(null);

    return (
        <>
            <div className="m-5 p-5 w-100 aside-shadow phone:w-80" >
                <h1 className="text-3xl phone:text-2xl">
                    {source.language.deleteProductList_Button}
                </h1>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="p-3 flex flex-col items-center gap-5 "
                >
                    <div className="flex gap-3">
                        <label htmlFor="productId" className="text-xl phone:text-sm">
                            Product ID
                        </label>
                        <input
                            type="text"
                            id="productId"
                            required
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="p-1 border-input"
                        />
                    </div>
                    <button
                        onClick={async () => {
                            try {
                                const res = await axios.delete(
                                    "/delete/product",
                                    {
                                        headers: {
                                            "x-auth-token":
                                                localStorage.getItem(
                                                    "authToken"
                                                ),
                                        },
                                        data: {
                                            productId,
                                        },
                                    }
                                );
                                messageRef.current.style.color = "green"
                                setResMessage(res.data);
                                setProductId("")
                            } catch (err) {
                                messageRef.current.style.color = "red"
                                setResMessage(err.response.data);
                            }
                        }}
                        className="border-button p-2 hover:bg-slate-100 phone:text-sm"
                    >
                        {source.language.deleteProductList_Button}
                    </button>
                    <span ref={messageRef}>{resMessage}</span>
                </form>
            </div>
        </>
    );
};

export default DeleteProductPopUp;
