import { useNavigate } from "react-router-dom";
const PageNoteFound = () => {
    const navigateBack = useNavigate()
    return (
        <>
            <h1 className="mb-5 text-center text-3xl text-red-600 font-bold">Error 404: Page Note Found</h1>
            <h2 onClick={() => navigateBack("/")} className="text-center text-2xl font-bold cursor-pointer">Go Back</h2>
        </>
    );
};

export default PageNoteFound;
