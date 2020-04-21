import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CanvasJSReact from '../../assets/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Chart = () => {
    const [month, setMonth] = useState('')
    const [confirmed, setConfirmed] = useState([])
    const [deaths, setDeaths] = useState([])

    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Comparison of Covid 19"
        },
        subtitles: [{
            text: "Covid 19 Confirmed & Deaths"
        }],
        axisY: {
            includeZero: false,
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                type: "spline",
                name: "CONFIRMED",
                showInLegend: true,
                xValueFormatString: "DD MMM YYYY",
                yValueFormatString: "#,###",
                dataPoints: confirmed
            },
            {
                type: "spline",
                name: "DEATHS",
                showInLegend: true,
                xValueFormatString: "DD MMM YYYY",
                yValueFormatString: "#,###",
                dataPoints: deaths
            }
        ]
    }

    useEffect(() => {
        axios('https://covid19.mathdro.id/api/daily')
            .then(res => {
                const yu = Array.from(res.data).pop()
                setMonth(yu.reportDate)
                const cb = res.data.map((val, i) => {
                    return { x: new Date(val.reportDate), y: val.totalConfirmed }
                })
                setConfirmed(cb)
                const cx = res.data.map((val, i) => {
                    return { x: new Date(val.reportDate), y: val.deaths.total }
                })
                setDeaths(cx)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="my-3">
            <CanvasJSChart options={options} />
            <div style={{ textAlign: 'center', fontWeight: '700' }}>
                Last updated ,  <span>{month}</span>
            </div>
        </div>
    )
}
