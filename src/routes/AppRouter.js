import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../Components/Home'
import { Archived } from '../Components/Archived'

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/archived" element={<Archived />} />
            </Routes>
        </Router>
    )
}
