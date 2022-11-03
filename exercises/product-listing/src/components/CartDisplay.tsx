import { IProductInfo } from "../typings";
import ItemInfo from "./ItemInfo";
import useUserInformation from "../hooks/useUserInformation";
import { memo } from "react";
import { Link } from 'react-router-dom';
import './CartDisplay.css'
import Paginator from "./Paginator";

interface ICartDisplayProps {
    cartItems: IProductInfo[]
    removeFromCart: (id: number) => void
}

const CartDisplay: React.FC<ICartDisplayProps> = ({ cartItems, removeFromCart }) => {
    const userInfo = useUserInformation();

    return <div className="items-display-container">
        <div className="title-container">
            <span className="cart-title bordered">{userInfo?.firstName ?? 'default'}'s Cart</span>
            <Link to='/' className='link bordered'>
                <span>Home</span>
            </Link>
        </div>
        <Paginator items={cartItems}>
            {items => (
                <>
                    {items.length === 0 ? <div>No Items to display</div> : null}
                    {items.map(item => <ItemInfo
                        key={item.id}
                        item={item}
                        addItemToCart={() => { }}
                        removeFromCart={() => removeFromCart(item.id)}
                        isAddedToCart={true}
                    />)}
                </>
            )}
        </Paginator>
    </div>
}

export default memo(CartDisplay);