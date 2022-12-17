import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import HomeLayout from './pages/Home'
import Houses from './pages/Home/houses'
import Jobs from './pages/Home/jobs'
import DetailPage from './pages/detail'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="/" element={<Houses />} />
                        <Route path="/houses" element={<Houses />} />
                        <Route path="/jobs" element={<Jobs />} />
                    </Route>
                    <Route path="/houses/:id" element={<DetailPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
