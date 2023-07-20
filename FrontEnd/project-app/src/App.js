import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react'
import AllItems from './Components/AllItems/AllItems.js';
import LoadingScreen from './Components/Spinner/Spinner.js'
import {Card, Button} from 'flowbite-react'
import CreateAccount from './Components/CreateAccount/CreateAccount.js'
import AccountCreated from './Components/CreateAccount/AccountCreated.js'
import ManagerContent from './Components/ManagerContent/ManagerContent.js'
import SignIn from './Components/SignIn/SignIn.js'
import AddItem from './Components/AddItem/AddItem.js'
import Cookies from 'js-cookie'



function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModal2, setIsOpenModal2] = useState(false)
  const [isOpenModal3, setIsOpenModal3] = useState(false)
  const [userValidated, setUserValidated] = useState(false)
  const [reload, setReload] = useState(true)
  const [user, setUser] = useState('')
  const Navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token');
    const userId = Cookies.get('id');
    const username = Cookies.get('username');

    if(token && userId){
      setUserValidated(true)
      setUser(username)
    }

    fetch('http://localhost:8080/items')
    .then(res => res.json())
    .then(data => {setItems(data); setLoading(false)})
  }, [userValidated, isOpenModal3, reload])

  if(loading || items.length < 1){
    return <LoadingScreen />
  }
  return (
    <div className="App">
      {isOpenModal && <CreateAccount setIsOpenModal={setIsOpenModal} setIsOpenModal2={setIsOpenModal2} />}
      {isOpenModal2 && <AccountCreated setIsOpenModal2={setIsOpenModal2}/>}
      {isOpenModal3 && <SignIn setIsOpenModal3={setIsOpenModal3} Navigate={Navigate}/>}
      {!userValidated && (
        <div>
        <Card >
        <div className="flex items-center justify-between">
          <h1 className="w-fit">Z-Prefix-Project</h1>
        <div className="flex  gap-10 w-fit">
          <Button onClick={() => setIsOpenModal3(true)}>Sign-In</Button>
          <Button onClick={() => setIsOpenModal(true)}>Create Account</Button>
        </div>
        </div>
      </Card>
      <div className="flex justify-center mt-5">
      <Button onClick={() => {setReload(!reload); Navigate('/')}}>Full Inventory</Button>
      </div>
      </div>

      )}
      {userValidated && (
        <>
        <Card >
        <div className="flex items-center justify-between">
          <h1 className="w-fit">Z-Prefix-Project</h1>
          <h1>Greetings {user}</h1>
        <div className="flex  gap-10 w-fit">
          <Button onClick={() => {Cookies.remove('token'); Cookies.remove('id'); Cookies.remove('username'); setUserValidated(false); Navigate('/')}}>Sign-Out</Button>
        </div>
        </div>
      </Card>
      <div className="flex mt-5 gap-4 justify-center">
        <Button onClick={() => {setReload(!reload); Navigate('/user/items')}}>Added Inventory</Button>
        <Button onClick={() => {setReload(!reload); Navigate('/')}}>Full Inventory</Button>
        <Button onClick={() => {setReload(!reload); Navigate('/user/addItem')}}>+</Button>
      </div>
      </>
      )}

      <div  className="mt-10">
      <Routes>
        <Route path='/*' element={<AllItems items={items} reload={reload} setReload={setReload}/>}/>
        <Route path='/user/items/*' element={<ManagerContent reload={reload} setReload={setReload}/>}/>
        <Route path='/user/addItem' element={<AddItem />}/>
      </Routes>
     </div>
    </div>
  );
}

export default App;
