import React, { useContext, useEffect } from 'react'
import { GlobalContext } from "../context/GlobalState";
import { List } from './List'
import { Format } from './Format'
export const SideBar = () => {
    const { GetApiCovid, TotalCovid } = useContext(GlobalContext)

    useEffect(() => {
        GetApiCovid()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHight: '100%', padding: '5px' }}>
            <h1 className="text-seidebar">Covid 19</h1>
            <div className="mb-2 px-2">
                <div className="prov">
                    <div className="headerSidebar text-warning">confirmed
                     <span>{Format(TotalCovid.confirmed)}</span>
                    </div>
                    <div className="headerSidebar text-danger">deaths
                        <span>{Format(TotalCovid.deaths)}</span>
                    </div>
                    <div className="headerSidebar text-success"> Recovered
                        <span>{Format(TotalCovid.recovered)}</span>
                    </div>
                </div>
            </div>
            <List />
        </div>
    )
}
