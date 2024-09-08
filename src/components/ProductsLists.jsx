import { useContext } from "react";
import ProductList from "./ProductList";
import { Source } from "../App";

// images
import smartPhoneIcon from "../assets/smart-phone-icon.svg";
import tabletIcon from "../assets/tablet-icon.svg";
import itLaptopIcon from "../assets/it-laptop-icon.svg";
import smartGadgetIcon from "../assets/smart-gadget-icon.svg";
import audioSpeakerIcon from "../assets/audio-speaker-icon.svg";
import gamingIcon from "../assets/gaming-icon.svg";
import tvIcon from "../assets/tv-icon.svg";
import cameraIcon from "../assets/camera-icon.svg";

const ProductsLists = () => {
    const source = useContext(Source);
    const changePopUpStatus = (popUp, setPopUp) => {
        !popUp ? setPopUp(true) : setPopUp(false);
    };
    return (
        <>
            <ul className="w-full">
                <ProductList
                    image={smartPhoneIcon}
                    name={source.language.mobilePhones}
                    fun={() =>
                        changePopUpStatus(
                            source.mobilePhonesPopUpStatus,
                            source.setMobilePhonesPopUpStatus
                        )
                    }
                />
                <ProductList
                    image={tabletIcon}
                    name={
                        source.language.tabs + " " + source.language.comingSoon
                    }
                />
                <ProductList
                    image={itLaptopIcon}
                    name={
                        source.language.itLaptops +
                        " " +
                        source.language.comingSoon
                    }
                />
                <ProductList
                    image={smartGadgetIcon}
                    name={
                        source.language.smartGadgets +
                        " " +
                        source.language.comingSoon
                    }
                />
                <ProductList
                    image={audioSpeakerIcon}
                    name={
                        source.language.audioSystems +
                        " " +
                        source.language.comingSoon
                    }
                />
                <ProductList
                    image={gamingIcon}
                    name={
                        source.language.gaming +
                        " " +
                        source.language.comingSoon
                    }
                />
                <ProductList
                    image={tvIcon}
                    name={
                        source.language.tvMonitors +
                        " " +
                        source.language.comingSoon
                    }
                />
                <ProductList
                    image={cameraIcon}
                    name={
                        source.language.photo + " " + source.language.comingSoon
                    }
                />
            </ul>
        </>
    );
};

export default ProductsLists;
