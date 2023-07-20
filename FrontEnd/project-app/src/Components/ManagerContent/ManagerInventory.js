import ListBuilder from '../ListBuilder/ListBuilder.js'
import React from 'react'

export default function ManagerInventroy({items}) {
  return (
    <div>
      <h1 className="text-center mb-5">Your Inventory</h1>
      <ListBuilder items={items}/>
    </div>
  )
}