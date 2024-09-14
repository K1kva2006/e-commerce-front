import { useState } from "react";
import axios from "axios";
import leftArrowSlideIcon from "../assets/left-arrow-slide-icon.svg";
import rightArrowSlideIcon from "../assets/right-arrow-slide-icon.svg";

const serverUrl = "https://e-commerce-back-19ay.onrender.com/ads/";

const slideImages = [
    {
        url: serverUrl + "iphone-15-pro-max.webp",
        caption: "iPhone 15 Pro Max",
    },
    {
        url: serverUrl + "samsung-galaxy-s24-ultra.webp",
        caption: "Samsung Galaxy S24 Ultra",
    },
    {
        url: serverUrl + "google-pixel-8-pro.webp",
        caption: "Google Pixel 8 Pro",
    },
    {
        url: serverUrl + "xiaomi-13-ultra.webp",
        caption: "Xioami 14 Ultra",
    },
];

const ImageSlider = () => {
    const [currentImage, setCurrentImage] = useState(slideImages[0]);

    return (
        <>
            <div className="relative px-20">
                <button
                    onClick={() => {
                        if (currentImage === slideImages[0]) {
                            setCurrentImage(slideImages[1]);
                        } else if (currentImage === slideImages[1]) {
                            setCurrentImage(slideImages[2]);
                        } else if (currentImage === slideImages[2]) {
                            setCurrentImage(slideImages[3]);
                        }
                    }}
                    className="absolute top-1/2 -right-8 -translate-x-14 -translate-y-2/4"
                >
                    <img
                        src={rightArrowSlideIcon}
                        alt="rightarrow"
                        className="hover:opacity-70"
                    />
                </button>

                <img
                    src={currentImage.url}
                    alt="ads"
                    style={{
                        maxWidth: "800px",
                        transform: "translate(-100%, -50%)",
                        
                        width: "600px",
                        position: "absolute",
                        zIndex: "-1",
                    }}
                />

                <span
                    style={{
                        top: "275px",
                        left: "-275px",
                        position: "absolute",
                        fontWeight: "bold"
                    }}
                    
                >
                    {currentImage.caption}
                </span>
                <button
                    onClick={() => {
                        if (currentImage === slideImages[1]) {
                            setCurrentImage(slideImages[0]);
                        } else if (currentImage === slideImages[2]) {
                            setCurrentImage(slideImages[1]);
                        } else if (currentImage === slideImages[3]) {
                            setCurrentImage(slideImages[2]);
                        }
                    }}

                    style={{
                        position: "absolute",
                        zIndex: -1,
                        transform: "translate(-650px, -50%)"
                    }}
                >
                    <img
                        src={leftArrowSlideIcon}
                        alt="leftarrow"
                        className="hover:opacity-70"
                    />
                </button>
            </div>
        </>
    );
};

export default ImageSlider;
