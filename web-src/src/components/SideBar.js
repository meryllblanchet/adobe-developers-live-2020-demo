/* 
* <license header>
*/

import React from 'react'
import { NavLink } from 'react-router-dom'

// Note from Meryll: the Shipment left nav item was the second change I did during my demo
function SideBar () {
  return (
    <ul className="SideNav">
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" activeClassName="is-selected" aria-current="page" exact to="/">Home</NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" activeClassName="is-selected" aria-current="page" to="/shipment">Your Shipment Data</NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" activeClassName="is-selected" aria-current="page" to="/about">About Project Firefly Apps</NavLink>
      </li>
    </ul>
  )
}

export default SideBar
