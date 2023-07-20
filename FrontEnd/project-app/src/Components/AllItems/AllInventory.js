import ListBuilder from '../ListBuilder/ListBuilder.js'


export default function AllInventroy({items}){
  return (
    <div>
      <h1 className="mt-5 text-center mb-5">Entire Inventory</h1>
      <ListBuilder items={items}/>
    </div>
  )
}