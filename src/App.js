import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StockOverviewPage from './pages/StockOverviewPage';
import StockDetailPage from './pages/StockDetailPage';
import 'bootstrap/dist/css/bootstrap.css';
import { WatchListContextProvider } from './context/watchListContext';


function App() {
  return (
    <main>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
