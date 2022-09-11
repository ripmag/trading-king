import {createContext, useState} from 'react'

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) =>{
    const [watchList, setWachList] = useState(["GOOGL", "MSFT", "AMZN"])
    
   

    const addStock =(stock) => {
        console.log(stock)
        if (watchList.indexOf(stock) === -1) {
            setWachList([...watchList, stock])
        }
    }
    const deleteStock = (stockDelete) => {
        setWachList(watchList.filter(stock => stock !== stockDelete))
    }

    return <WatchListContext.Provider value={{
        watchList,addStock,deleteStock,
        //stocks, setStock
        //search, setSearch,
        //searchList, setSearchList
    }}>
        {props.children}
    </WatchListContext.Provider>
}

