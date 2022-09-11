
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import finnHub from '../apis/finnHub';
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";

const StockList = () => {
    const [watchList, setWachList] = useState(["GOOGL", "MSFT", "AMZN"])
    const [stocks, setStock] = useState()
    const changeColor = (change) => {
        return (change > 0) ? "success" : "danger"
    }
    const renderIcon = (change) => {
    return (change >0) ? <TbArrowBigUpLines /> : <TbArrowBigDownLines />
    }
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {

                const res = await Promise.all(watchList.map(stock => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })

                }))

                const data = res.map(responce => {
                    return {
                        data: responce.data,
                        symbol: responce.config.params.symbol
                    }
                })

                console.log(data)
                if (isMounted)
                    setStock(data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

        return () => (isMounted = false)
    }, [])


    return (
        <div>
            <table className='table hover mt-5'>
                <thead style={{ color: "rgb(,79,89,102)" }}>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Last</th>
                        <th scope='col'>Chg</th>
                        <th scope='col'>Chg%</th>
                        <th scope='col'>Higth</th>
                        <th scope='col'>Low</th>
                        <th scope='col'>Open</th>
                        <th scope='col'>Pclose</th>
                    </tr>
                </thead>
                <tbody>
                {stocks.map((stock) => {
                        return (
                        <tr className='table-row' key={stock.symbol}>
                            <th scope='row'>{stock.symbol}</th>
                            <td>{stock.data.c}</td>
                            <td className={`text-${changeColor(stock.data.d)}`}>{renderIcon(stock.data.d)} {stock.data.d}</td>
                            <td className={`text-${changeColor(stock.data.dp)}`}>{renderIcon(stock.data.dp)} {stock.data.dp}</td>
                            <td>{stock.data.h}</td>
                            <td>{stock.data.l}</td>
                            <td>{stock.data.o}</td>
                            <td>{stock.data.pc}</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default StockList;