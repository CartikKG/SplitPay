import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllExpence from '../AllExpence/AllExpence'
import Dashboard from '../Dashboard/darshboard'
import Friends from '../Friends/Friends'
import Group from '../Group/Group'
import HomeDashboard from '../HomeDashboard/HomeDashboard'
import Personal from '../Personal/Personal'
import Recentactivity from '../Recentactivity/Recentactivity'
import Setting from '../Setting/Setting'

export default function AllRoutesAfterLogin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
            <Route path="/" element={<HomeDashboard/>}/>
            <Route path="/setting" element={<Setting/>}/>
            <Route path='/allexpence' element={<AllExpence/>}/>
            <Route path='/recentactivity' element={<Recentactivity/>}/>
            <Route path='/group' element={<Group/>}/>
            <Route path='/friends' element={<Friends/>}/>
            <Route path='/yourdetails' element={<Personal/>}/>
        </Route>
      </Routes>
    </div>
  )
}
