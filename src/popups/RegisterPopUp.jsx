import { useState, useContext, useRef } from "react";
import axios from "axios";
import { Source } from "../App";

import popupClose from "../assets/popup-close-icon.svg";
const RegisterPopUp = () => {
    const source = useContext(Source)

    const [closePopUp, setClosePopUp] = useState(true);

    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const chnageValue = (e, setValue) => {
        setValue(e.target.value);
    };

    const [resMessage, setResMessage] = useState("");
    const resMessageRef = useRef(null);

    const register = async () => {
        try {
            const res = await axios.post("/register", {
                name: nameValue,
                email: emailValue,
                phone: phoneValue,
                password: passwordValue,
            });
            resMessageRef.current.style.color = "green";
            setResMessage(res.data);
        } catch (err) {
            resMessageRef.current.style.color = "red";
            setResMessage(err.response.data);
        }
    };

    return (
        <>
            {closePopUp && (
                <div className="w-100 border-popup bg-gray-100 absolute -translate-x-1/2 -translate-y-1/2 phone:w-56">
                    <div className="flex relative mb-16 ">
                        <h2 className="absolute top-5 left-1/2 -translate-x-1/2 text-2xl ">
                            {source.language.register}
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
                        className="flex flex-col gap-4 p-4"
                    >
                        <input
                            type="text"
                            placeholder={source.language.name}
                            required
                            value={nameValue}
                            onChange={(e) => chnageValue(e, setNameValue)}
                            className="p-2 border-input"
                        />
                        <input
                            type="email"
                            placeholder={source.language.email}
                            required
                            value={emailValue}
                            onChange={(e) => chnageValue(e, setEmailValue)}
                            className="p-2 border-input"
                        />
                        <input
                            type="text"
                            placeholder={source.language.phone}
                            required
                            value={phoneValue}
                            onChange={(e) => chnageValue(e, setPhoneValue)}
                            className="p-2 border-input"
                        />
                        <input
                            type="password"
                            placeholder={source.language.password}
                            required
                            value={passwordValue}
                            onChange={(e) => chnageValue(e, setPasswordValue)}
                            className="p-2 border-input"
                        />
                        <button
                            onClick={register}
                            className="p-2 bg-gray-300 cursor-pointer border-button"
                        >
                            {source.language.registration}
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

export default RegisterPopUp;
