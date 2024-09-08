const ProductList = ({ image, name, fun }) => {
    return (
        <>
            <div
                onClick={fun}
                className="p-3 flex gap-2 cursor-pointer hover:bg-gray-100 aside-lists "
            >
                <img src={image} alt={image} />
                <li
                    className="select-none font-bold text-gray-400 text-xl  phone:text-sm small:text-xs"
                >
                    {name || "Product"}
                </li>
            </div>
        </>
    );
};
export default ProductList;
