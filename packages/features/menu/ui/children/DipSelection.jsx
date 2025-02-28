import Chip from "../../../../base/ui";

function DipSelection({ dips, price}) {

    return (
        <div className="pl-6 pb-6 border-t border-brown-500 border-dotted">
            <div className=" flex justify-between font-[Fira_Sans] text-xl font-semibold mt-6 mb-2">
                <span><div className="">Dips</div></span>
                <span className="text-right pr-6">{price} SEK</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
                {dips.map((dip) => (
                    <Chip 
                        key={dip.id}
                        label={dip.name}
                        name={dip.name}
                        id={dip.id}
                        price={dip.price}
                        ingredients={dip.ingredients}
                        type={dip.type}
                        description={dip.description} />
                ))}
            </div>
        </div>
    );
}
export default DipSelection;




