import backgroundImage from "../../../assets/backgroundimage.png";
import YYGS from "../../../assets/YYGS.svg";
import CartImage from "../../../assets/Cart.svg"
import { useGetMenuQuery } from "../../../../packages/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuItem from "./children/MenuItem";
import DipSelection from "./children/DipSelection";
import DrinkSelection from "./children/DrinkSelection";
import './index.css'



function Menu() {
    const navigate = useNavigate();
    const cartItemCount = useSelector((state) => state.cart.cartContent.length);

    const { data: menuData, error, isLoading } = useGetMenuQuery();

    if (isLoading) return <p>Loading menu...</p>;
    if (error) return <p>Error loading menu!</p>;

    const wontons = menuData?.items.filter((item) => item.type === "wonton") || [];
    const dips = menuData?.items.filter((item) => item.type === "dip") || [];
    const dipPrice = dips.length > 0 ? dips[0].price : 0;
    const drinks = menuData?.items.filter((item) => item.type === "drink") || [];
    const drinkPrice = drinks.length > 0 ? drinks[0].price : 0;


    return (
      <div style={{background: `#8ED8BF url(${backgroundImage}) no-repeat center/cover`}} className="flex flex-col items-center relative bg-fixed w-120 min-h-220">
        <img src={YYGS} className="absolute top-4 left-4 w-20 z-10 p-2"/>
        <div className="absolute top-6 right-6 w-15.5 h-15.5 z-10 p-2 bg-white rounded-sm flex items-center justify-center cursor-pointer" onClick={() => navigate("/Cart")}>
          <span className="absolute -top-2.5 -right-2 bg-[#EB5757] text-white text-xs font-thin w-5 h-5 flex items-center justify-center rounded-full">
            {cartItemCount}
          </span>
          <img src={CartImage} />
        </div>
        <div className="mt-32"></div>
        <div className="w-11/12 max-w-md bg-[#665C58] text-white rounded-md shadow-lg mb-6">
          <h2 className="text-[32px] font-bold uppercase tracking-wide font-[Fira_Sans] m-6">MENY</h2>
          <div>
      
           {wontons.length > 0 ? 
              wontons.map((item) => (
                <MenuItem 
                  key={item.id} 
                  id={item.id} 
                  type={item.type} 
                  name={item.name} 
                  price={item.price} 
                  description={item.description} 
                  ingredients={item.ingredients} 
                />
              )) 
              : <p>No wontons available</p>
            }
            {dips.length > 0 && <DipSelection dips={dips} price={dipPrice} />}
            {dips.length > 0 && <DrinkSelection drinks={drinks} price={drinkPrice} />}
          </div>
          
        </div>
      </div>
    )
}

export default Menu;
