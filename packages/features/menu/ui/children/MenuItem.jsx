import { useDispatch } from 'react-redux';
import { addToCart } from "../../../cart/index.js";

function MenuItem(props){
    const { id, type, name, price, description, ingredients } = props;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addToCart({
            id, 
            type, 
            name, 
            price, 
            description,
            ingredients: ingredients || []
        }));
    }

    const ingredientsString = ingredients.join(', ');

    return(
        <div className='pb-6 border-t border-brown-500 border-dotted' onClick={handleClick}>
            <div className="MenuItem font-[Fira_Sans] flex justify-between font-bold text-xl pt-4">
                <span className="text-left pl-6">{name}</span>
                <span className="text-right pr-6">{price} SEK</span>
            </div>
            <p className='text-sm mt-1 pl-6'>{ingredientsString}</p>
        </div>
    )
}

export default MenuItem;
