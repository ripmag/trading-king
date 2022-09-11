
import React, { useState } from 'react';
import { useEffect } from 'react';

import finnHub from '../apis/finnHub';
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";
import { WatchListContext } from '../context/watchListContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const StockList = () => {
    const [stocks, setStock] = useState([])
    const {watchList, setWachList} = useContext(WatchListContext)
    const navigate = useNavigate()

    const changeColor = (change) => {
        return (change > 0) ? "success" : "danger"
    }
    const renderIcon = (change) => {
    return (change >0) ? <TbArrowBigUpLines /> : <TbArrowBigDownLines />
    }
    const handleStockSelect = (symbol) =>{
        navigate(`detail/${symbol}`)
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
                console.log("res:",res)

                const data = res.map((responce) => {
                    return {
                        data: responce.data,
                        symbol: responce.config.params.symbol
                    }
                })

                console.log("data:",data)
                if (isMounted)
                    setStock(data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

        return () => (isMounted = false)
    }, [watchList])
    console.log(watchList)

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
                        <tr 
                        className='table-row'
                        key={stock.symbol}
                        style={{cursor:"pointer"}}
                        onClick={() => handleStockSelect(stock.symbol)}>
                            <td scope='row'>{stock.symbol}</td>
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