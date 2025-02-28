import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../../api";
import YYGS from "../../../assets/YYGS.svg";
import YYGS_red from "../../../assets/YYGS_red.svg";


function Receipt() {
    const { orderid } = useParams();
    const { data, error, isLoading } = useGetOrderQuery(orderid);
    const navigate = useNavigate();

    if (isLoading) return <p>Laddar kvitto...</p>;
    if (error) return <p>Ett fel uppstod: {error.message}</p>;
    if (!data || !data.order) return <p>Ingen order hittades.</p>;

    const { order } = data;
    const { items, orderValue } = order;
    const itemsGrouped = items.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].quantity += 1;
            acc[item.id].totalPrice += item.price;
        } else {
            acc[item.id] = {
                name: item.name,
                quantity: 1,
                totalPrice: item.price,
            };
        }
        return acc;
    }, {});

    const groupedArray = Object.values(itemsGrouped);

    return (
        <div className="bg-[#605858] w-120 min-h-screen relative p-6 font-[Fira_Sans] overflow-auto">
            <img src={YYGS} className="absolute top-4 left-4 w-20 z-10"/>
            <div className="relative bg-white w-11/12 mx-auto rounded-lg shadow-lg text-black mt-32">
                <div className="text-center py-6">
                    <img src={YYGS_red} className="mx-auto my-6"></img>
                    <h2 className="text-2xl font-bold">KVITTO</h2>
                    <p>#{orderid}</p><br/>

                    {groupedArray.map((item, index) => (
                    <div  key={item.name + index} className="pl-6">
                        <div className=" flex justify-between font-[Fira_Sans] text-xl font-semibold mt-6 mb-2">
                            <span><div className="">{item.name}</div></span>
                            <span className="text-right pr-6">{item.totalPrice} SEK</span>
                        </div>
                        <div className="text-left">{item.quantity} stycken</div>
                    </div>    
                    ))}
                    <div className="bg-[#c2c1c1] py-6 mt-8 rounded-b-lg">
                        <div className=" flex justify-between font-[Fira_Sans] text-xl font-semibold pl-6">
                            <span><div className="">TOTALT</div></span>
                            <span className="text-right pr-6"> {orderValue} SEK</span>
                        </div>
                        <div className="text-left pl-6">Inkl 20% moms</div>
                    </div>
                </div>
            </div>
            <button className="relative bottom-8 mt-16 px-4 py-2 mt-4 rounded font-[Fira_Sans] left-1/2 transform -translate-x-1/2 w-11/12"
                    onClick={() => navigate('/')}>GÖR EN NY BESTÄLLNING
            </button>
          
        </div>
    );
    
}


export default Receipt;
