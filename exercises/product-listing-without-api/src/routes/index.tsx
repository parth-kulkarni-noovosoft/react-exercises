import AddProduct from "./AddProduct";
import NotFound from "./NotFound";
import Page from "./Page";

const viewMap = {
    'cart': <Page />,
    'home': <Page />,
    'notFound': <NotFound />,
    'addProduct': <AddProduct />
};

export default viewMap;