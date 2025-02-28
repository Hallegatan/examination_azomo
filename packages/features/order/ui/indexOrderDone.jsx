import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import YYGS from "../../../assets/YYGS.svg";
import boxtop from "../../../assets/boxtop.png"

function OrderDone(){
    const { orderid } = useParams();
    const navigate = useNavigate();

    return (
        <div className="bg-[#605858] w-120 min-h-220 relative p-6 font-[Fira_Sans]">
            <img src={YYGS} className="absolute top-4 left-4 w-20 z-10"/>
            <img className="mt-32 mx-auto" src={boxtop}></img>
            <div className=" text-center text-3xl tracking-wide">
                <div className="font-bold mb-2">
                    DINA WONTONS TILLAGAS! <br/>
                </div>
                <div className="font-normal mb-4">ETA 5 MIN</div>
                <div className="text-sm">#{orderid}</div>
            </div>

            <button className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-11/12 h-20" 
                    onClick={() => {navigate('/')}}>GÖR EN NY BESTÄLLNING</button>
            <button className="transparent absolute bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 h-20"
                    onClick={() => {navigate(`/orderdone/${orderid}/receipt`)}}>SE KVITTO</button>
        </div>
    )
}

export default OrderDone;

