import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeLayout from './pages/Home'
import Houses from './pages/Home/houses'
import Jobs from './pages/Home/jobs'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="/" element={<Houses />} />
                        <Route path="/houses" element={<Houses />} />
                        <Route path="/jobs" element={<Jobs />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
