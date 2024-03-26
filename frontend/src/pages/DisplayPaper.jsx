import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChooseSubject from '../components/ChooseSubject'

export default function DisplayPaper() {
  return (
    <div>
      <Navbar />
      <Sidebar />
    
      <div className='mainPart'>
        <ChooseSubject value={3} />
      </div>
    </div>
  )
}

