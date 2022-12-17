import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import HomeLayout from './pages/Home'
import Houses from './pages/Home/houses'
import Jobs from './pages/Home/jobs'
import HomeDetailPage from './pages/detail/homeDetail'
import JobDetailPage from './pages/detail/jobDetail'
import MapPage from './pages/map'
import BookingPage from './pages/booking'
import RoommatePage from './pages/roommate'

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
                    <Route path="/houses/:id" element={<HomeDetailPage />} />
                    <Route path="/jobs/:id" element={<JobDetailPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/roommate" element={<RoommatePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
