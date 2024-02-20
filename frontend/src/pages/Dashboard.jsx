import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      {/* import sidebar from '../components/Sidebar' */}
      <Sidebar />
      <div className='main'>
      <h1> This is Dashboard </h1>
      </div>
    </div>
  )
}
