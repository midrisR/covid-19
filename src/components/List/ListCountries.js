import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Format } from '../Format'

export const ListCountries = ({ open, city }) => {

    const { Covid } = useContext(GlobalContext);

    const sort = Covid.filter(function (item) {
        return item.countryRegion === city;
    });

    let output = sort.reduce((op, cur) => {
        if (op[cur.provinceState || cur.countryRegion]) {
            op[cur.provinceState]['confirmed'] += cur.confirmed;
        } else {
            op[cur.provinceState || cur.countryRegion] = {
                province: cur.provinceState || cur.countryRegion,
                confirmed: cur.confirmed,
            }
        }
        return op;
    }, {})
    const obj = Object.values(output)

    return (
        <div>
            {obj.map((val, j) => {
                return (
                    <div key={j} className={`px-3 pb-3 ${open ? "d-block" : "d-none"}`}>
                        <div className="prov border-bottom">
                            <div className="drop-list py-2">
                                {val.province}
                            </div>
                            <div className="count">{Format(val.confirmed)}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
