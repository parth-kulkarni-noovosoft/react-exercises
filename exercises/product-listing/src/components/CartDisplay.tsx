import { IProductInfo } from "../typings";
import ItemInfo from "./ItemInfo";
import useUserInformation from "../hooks/useUserInformation";
import { memo } from "react";
import { Link } from 'react-router-dom';
import './CartDisplay.css'

interface ICartDisplayProps {
    items: IProductInfo[]
    removeFromCart: (id: number) => void
}

const CartDisplay: React.FC<ICartDisplayProps> = ({ items, removeFromCart }) => {
    const userInfo = useUserInformation();

    return <div className="items-display-container">
        <div className="title-container">
            <span className="cart-title bordered">{userInfo?.firstName ?? 'default'}'s Cart</span>
            <Link to='/' className='link bordered'>
                <span>Home</span>
            </Link>
        </div>
        {items.map(item => <ItemInfo
            key={item.id}
            item={item}
            addItemToCart={() => {}}
            removeFromCart={() => removeFromCart(item.id)}
            isAddedToCart={true}
        />)}
    </div>
}

export default memo(CartDisplay);