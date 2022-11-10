import AddProduct from "./AddProduct";
import Home from "./Home";
import NotFound from "./NotFound";

const viewMap = {
    'home': <Home />,
    'notFound': <NotFound />,
    'addProduct': <AddProduct />
};

export default viewMap;