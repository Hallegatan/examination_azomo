import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeItemFromCart, addToCart } from "../";
import { usePostOrderMutation } from "../../../../packages/api";
import CartImage from "../../../assets/Cart.svg";

function Cart() {
    const [postOrder, { isLoading, error }] = usePostOrderMutation();
    const cartItems = useSelector((state) => state.cart.cartContent);
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const groupedItems = cartItems.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].quantity += 1;
            acc[item.id].totalPrice += item.price;
        } else {
            acc[item.id] = {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                totalPrice: item.price,
            };
        }
        return acc;
    }, {});

    const groupedArray = Object.values(groupedItems);

    useEffect(() => {
        const cost = groupedArray.reduce((acc, item) => acc + item.totalPrice, 0);
        setTotalCost(cost);
    }, [groupedArray]);

    async function handleOrder() {
        if (cartItems.length === 0) {
            console.warn("🚨 No items in cart. Order not processed.");
            return;
        }

        try {
            const itemsToOrder = cartItems.map(item => item.id);
            const response = await postOrder({ items: itemsToOrder }).unwrap();
            console.log("Order placed successfully. Order ID:", response.order.id);
            dispatch(clearCart());
            navigate(`/orderdone/${response.order.id}`);
        } catch (error) {
            console.error("❌ Failed to place order:", error);
        }
    }

    function removeItem(itemId) {
        dispatch(removeItemFromCart(itemId));
    }

    function addItem(item) {
        dispatch(addToCart(item));
    }

    return (
        <div className="bg-[#eeeeee] w-120 min-h-screen relative p-6 font-[Fira_Sans] overflow-auto">
            <div className="absolute top-6 right-6 w-15.5 h-15.5 z-10 p-2 rounded-sm flex items-center justify-center cursor-pointer" onClick={() => navigate("/")}>
                <img src={CartImage} />
            </div>

            <div className="mt-20 text-black border-y border-brown-500 border-dotted">
                {groupedArray.length === 0 ? (
                    <p className="my-10 text-center">Din kundkorg är tom!</p>
                ) : (
                    <ul>
                        {groupedArray.map((item) => (
                            <div key={item.id} className="mb-6">
                                <div className="flex justify-between font-[Fira_Sans] text-xl font-semibold mt-6 mb-2">
                                    <span>{item.name}</span>
                                    <span className="text-right pr-6">{item.totalPrice} SEK</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm text-gray-500">{item.quantity} stycken</span>
                                    <div className="flex gap-1 mt-1">
                                        <button 
                                            className="text-white px-1 py-0.5 text-sm rounded h-8 small-button"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            −
                                        </button>
                                        <button 
                                            className="text-white px-1 py-0.5 text-sm rounded h-8 small-button"
                                            onClick={() => addItem(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>

            <div className="relative w-11/12 mt-10">
                <div className="h-20 w-[428px] bg-[#c2c1c1] text-black flex justify-between items-center font-[Fira_Sans] text-xl font-semibold mt-6 rounded">                     
                    <span className="pl-4">TOTALT</span>
                    <span className="text-right text-3xl pr-6">{totalCost} SEK</span>              
                </div>
                <button className="w-[428px] h-20" onClick={handleOrder} disabled={isLoading}>
                    {isLoading ? "Processing..." : "TAKE MY MONEY!"}
                </button>
                {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            </div>
        </div>
    );
}

export default Cart;
