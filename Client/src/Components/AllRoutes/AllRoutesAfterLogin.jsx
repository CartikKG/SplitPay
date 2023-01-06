import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllExpence from '../AllExpence/AllExpence'
import Dashboard from '../Dashboard/darshboard'
import Group from '../Group/Group'
import HomeDashboard from '../HomeDashboard/HomeDashboard'
import Setting from '../Setting/Setting'

export default function AllRoutesAfterLogin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
            <Route path="/" element={<HomeDashboard/>}/>
            <Route path="/setting" element={<Setting/>}/>
            <Route path='/allexpence' element={<AllExpence/>}/>
            <Route path='/group' element={<Group/>}/>
        </Route>
      </Routes>
    </div>
  )
}
