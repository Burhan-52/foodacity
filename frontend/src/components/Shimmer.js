import { shimmer_card_unit } from "../../config";

const CardShimmer = () => {
    return (
        <div className="shimmer-card">
            <div className="shimmer-img stroke animate"></div>
            <div className="shimmer-title stroke animate"></div>
            <div className="shimmer-tags stroke animate "></div>
            <div className="shimmer-details stroke animate "></div>
        </div>
    );
};

export const MenuShimmer = () => {
    return (
        <div className="restaurant-menu-container">

            <div className="restaurant-menu-content">
                <div className="menu-items-container">
                    <div className="menu-items-list">
                        {Array(4).fill("").map((element, index) =>
                                <div className="shimmer-menu-card" key={index}>
                                    <div className="shimmer-item-details">
                                        <h3 className="shimmer-w40  stroke animate"></h3>
                                        <p className="shimmer-w20  stroke animate"> </p>
                                        <p className="shimmer-w60  stroke animate"></p>
                                    </div>
                                    <div className="shimmer-img-wrapper">
                                        <img className="shimmer-img stroke animate" />
                                    </div>
                                </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export const Shimmer = () => {
    return (
        <div className="shimmer-container">
            {new Array(shimmer_card_unit).fill(0).map((element, index) => {
                return <CardShimmer key={index} />;
            })}
        </div>
    );
};