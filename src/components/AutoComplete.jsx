import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import finnHub from '../apis/finnHub';

const AutoComplete = () => {
    const [search, setSearch] = useState("")
    const [searchList, setSearchList] = useState([])
    const renderDropdown = () => {
        const dropDownClass = search ? "show" : null
        return(
            <ul className={`dropdown-menu ${dropDownClass}`}
            style={{
                height:"20rem",
                overflowY:"scroll",
                overflowX:"hidden",
                cursor:"pointer"

            }} >
                {searchList.map((stock) =>{
                    return (
                        <li key={stock.symbol} className='dropdown-item'>{stock.description}</li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        if (!search) return
        const fetchData = async () => {
            try {
                const res = await finnHub("/search", {
                    params: {
                        q: search
                    }
                })
                if (res) {
                    console.log(res)
                    let symbolList = res.data.result.map(stock => { return { symbol: stock.symbol } })
                    setSearchList(res.data.result)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

    }, [search])
    return (
        <div className='w-50 p-5 rounded mx-auto'>
            <div className='form-floating dropdown'>
                <input id="search" type="text" className="form-control" placeholder="Search" autoComplete='off'
                    onChange={(e) => setSearch(e.target.value)} value={search}></input>
                <label htmlFor="search">Search</label>
                <ul className='dropdown-menu show'>
                    {renderDropdown()}
                </ul>
            </div>
        </div>
    );
};

export default AutoComplete;