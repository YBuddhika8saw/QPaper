import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChooseSubject from '../components/ChooseSubject'


export default function QuestionBank() {

    
  return (
    <div>
    <Navbar />
    <Sidebar />
    <div className='mainPart'>
      <ChooseSubject value={2} />
    </div>
  </div>
  );
}