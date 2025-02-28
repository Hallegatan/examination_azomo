import { useDispatch } from 'react-redux';
import { addToCart } from "../../features/cart/index.js";

function Chip(props){
    const {label, id, type, name, price, description, ingredients} = props;
    const dispatch = useDispatch();

const handleClick = () => {
    const itemToAdd = {
        id, 
        type, 
        name, 
        price, 
        description,
        ingredients: ingredients || []
    };

    console.log("Item dispatched from Chip: ", itemToAdd);
    dispatch(addToCart(itemToAdd));
};

    return(
        <div className="bg-[#837D7C] px-4 py-2 mr-2 my-1 rounded-sm font-[Fira_Sans] text-sm" onClick={handleClick}>
            {label}
        </div>
    )
}

export default Chip;



