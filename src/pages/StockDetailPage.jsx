import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import finnHub from '../apis/finnHub';
import {StockChart} from '../components/StockChart';
import StockData from '../components/StockData';

const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: Math.floor (data.c[index])
    }
    })
}

const StockDetailPage = () => {
    const { symbol } = useParams()
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime() / 1000)
            let oneDay
            if (date.getDay() === 6)
                oneDay = currentTime - 2 * 24 * 60 * 60
            else if (date.getDay() === 0)
                oneDay = currentTime - 3 * 24 * 60 * 60
            else
                oneDay = currentTime - 24 * 60 * 60

            const oneWeek = currentTime - 7 * 24 * 60 * 60
            const oneYear = currentTime - 365 * 7 * 24 * 60 * 60

            try {
                const res = await Promise.all([finnHub("/stock/candle", {
                    params: {
                        symbol,
                        resolution: 30,
                        from: oneDay,
                        to: currentTime
                    }
                }), finnHub("/stock/candle", {
                    params: {
                        symbol,
                        resolution: 60,
                        from: oneWeek,
                        to: currentTime
                    }
                }), finnHub("/stock/candle", {
                    params: {
                        symbol,
                        resolution: "W",
                        from: oneYear,
                        to: currentTime
                    }
                })])

                setChartData({
                    day: formatData(res[0].data),
                    week: formatData(res[1].data),
                    year: formatData(res[2].data)
                })
            } catch (error) {
                console.log(error)
            }

        }
        fetchData()


    }, [symbol])


    return (
        <div>
            {chartData && (
                <div>
                    <StockChart chartData={chartData} symbol={symbol} />
                    <StockData symbol={symbol}/>
                    </div>
            )}            
        </div>
    );
};

export default StockDetailPage;