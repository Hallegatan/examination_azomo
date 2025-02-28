import Chip from "../../../../base/ui";

function DrinkSelection({ drinks, price }) {

    return (
        <div className="pl-6 pb-6 border-t border-brown-500 border-dotted">
            <div className=" flex justify-between font-[Fira_Sans] text-xl font-semibold mt-6 mb-2">
                <span><div className="">Drinks</div></span>
                <span className="text-right pr-6">{price} SEK</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mr-6 mt-6">
                {drinks.map((drink) => (
                    <Chip 
                        key={drink.id}
                        label={drink.name}
                        name={drink.name}
                        type={drink.type}
                        id={drink.id}
                        price={drink.price}
                        description={drink.description} 
                        ingredients={drink.ingredients}/>
                ))}
            </div>
        </div>
    );
}

export default DrinkSelection;



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