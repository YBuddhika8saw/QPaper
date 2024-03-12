import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChooseSubject from '../components/ChooseSubject'

export default function CreatePaper() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className='mainPart'>
        <ChooseSubject value={1} />
      </div>
    </div>
  )
}

