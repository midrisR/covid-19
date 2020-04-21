import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '../../context/GlobalState'
import { ListCountries } from './ListCountries'
import { FiChevronDown } from "react-icons/fi";
import { Format } from '../Format'

export const List = () => {
  const { GetData, Covid } = useContext(GlobalContext)
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('');
  const output = Covid.reduce((op, cur) => {
    if (op[cur.countryRegion]) {
      op[cur.countryRegion]['positive'] += cur.confirmed;
    } else {
      op[cur.countryRegion] = {
        country: cur.countryRegion,
        positive: cur.confirmed,
      }
    }
    return op;
  }, {})

  const sort = Object.values(output);

  sort.sort(function (a, b) {
    return b.positive - a.positive;
  });

  function toggle(id, city) {
    setCity(city)
    setOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }

  useEffect(() => {
    GetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="scrollbar" style={{ height: 400, overflow: 'overlay' }}>
      {sort.map((cc, i) => {
        return (
          <div className="dropList mb-3" key={i}>
            <div
              className="mb-2 px-2 list-prov"
              key={i}
              onClick={() => toggle(i, cc.country)}
            >
              <div className="prov">
                <div className="name-prov">{cc.country}</div>
                <div className="count">{Format(cc.positive)}</div>
              </div>
              <FiChevronDown />
            </div>
            <ListCountries open={open[i]} city={city} />
          </div>
        );
      })}
    </div>
  )
} 