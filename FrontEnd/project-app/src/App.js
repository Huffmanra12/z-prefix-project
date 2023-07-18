import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react'
import Visitor from './Components/Visitor/Visitor.js';
import LoadingScreen from './Components/Spinner/Spinner.js'
import {Card, Button} from 'flowbite-react'
import CreateAccount from './Components/CreateAccount/CreateAccount.js'
import AccountCreated from './Components/CreateAccount/AccountCreated.js'
import Cookies from 'js-cookie';


function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModal2, setIsOpenModal2] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/items')
    .then(res => res.json())
    .then(data => {setItems(data); setLoading(false)})
  }, [])

  if(loading || items.length < 1){
    return <LoadingScreen />
  }
  return (
    <div className="App">
      <div>
        <Card>
          <h1>Z-Prefix-Project</h1>
          <Button className="w-fit">Sign-In</Button>
          <Button onClick={() => setIsOpenModal(true)}>Create Account</Button>
          </Card>
          </div>
          {isOpenModal && <CreateAccount setIsOpenModal={setIsOpenModal} setIsOpenModal2={setIsOpenModal2} />}
          {isOpenModal2 && <AccountCreated setIsOpenModal2={setIsOpenModal2}/>}
      <div  className="border-2 border-red-500">
      <Routes>
        <Route path='/*' element={<Visitor items={items}/>}/>
      </Routes>
     </div>
    </div>
  );
}

export default App;
