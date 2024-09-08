import { useState, useContext ,useRef } from "react";
import axios from "axios";

import { Source } from "../App";

import popupClose from "../assets/popup-close-icon.svg";

const AuthorizationPopUp = () => {
    const sourcer = useContext(Source)

    const [closePopUp, setClosePopUp] = useState(true);

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const chnageValue = (e, setValue) => {
        setValue(e.target.value);
    };

    const [resMessage, setResMessage] = useState("");
    const resMessageRef = useRef(null);

    const login = async () => {
        try {
            const res = await axios.post("/login", {
                email: emailValue,
                password: passwordValue,
            });
            resMessageRef.current.style.color = "green";
            setResMessage(res.data.message);
            localStorage.setItem("authToken", res.data.authToken);

            setTimeout(() => window.location.reload(), 500);
        } catch (err) {
            resMessageRef.current.style.color = "red";
            setResMessage(err.response.data);
        }
    };

    return (
        <>
            {closePopUp && (
                <div className="w-100 border-popup bg-gray-100 absolute -translate-x-1/2 -translate-y-1/2 phone:w-56">
                    <div className="flex mb-16">
                        <h2 className="absolute top-5 left-1/2 -translate-x-1/2 text-2xl ">
                            {sourcer.language.authorization}
                        </h2>
                        <img
                            src={popupClose}
                            alt="close"
                            onClick={() => {
                                !closePopUp
                                    ? setClosePopUp(true)
                                    : setClosePopUp(false);
                            }}
                            className="absolute top-6 left-full -translate-x-9 cursor-pointer"
                        />
                    </div>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col gap-4 p-4  "
                    >
                        <input
                            type="email"
                            placeholder={sourcer.language.email}
                            required
                            value={emailValue}
                            onChange={(e) => chnageValue(e, setEmailValue)}
                            className="p-2 border-input "
                        />
                        <input
                            type="password"
                            placeholder={sourcer.language.password}
                            required
                            value={passwordValue}
                            onChange={(e) => chnageValue(e, setPasswordValue)}
                            className="p-2 border-input"
                        />
                        <button
                            onClick={login}
                            className="p-2 bg-gray-300 cursor-pointer border-button"
                        >
                            {sourcer.language.authorization}
                        </button>
                        <span ref={resMessageRef} className="font-bold">
                            {resMessage}
                        </span>
                    </form>
                </div>
            )}
        </>
    );
};

export default AuthorizationPopUp;
