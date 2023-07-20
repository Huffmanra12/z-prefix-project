import {Card, Button} from 'flowbite-react'
import {useNavigate} from 'react-router-dom'
import LoadingScreen from '../Spinner/Spinner.js'

export default function ListBuilder({items}){
  const Navigate = useNavigate();

if(items.length < 1){
  return (
  <Card>
    <p className="text-center">No Items To display</p>
  </Card>
    )
}

return (
  <div className={`flex flex-wrap justify-center${items.length < 1 ? 'md:grid md:grid-cols-4 sm: grid-cols-1' : ''} gap-10 `}>
    {items.map((e, i) => {
      const shortDesc = e.description.substring(0,100)
      return(
        <Card key={i} className="max-w-md flex flex-col items-center">
          <p>{e.item_name}</p>
          <p className="max-w-md break-all">{shortDesc}...</p>
          <p>{e.quantity}</p>
          <Button onClick={() => {Navigate(`${e.item_name}/${e.id}`)}}>Select Item</Button>
        </Card>
      )
    })}
  </div>
)

}