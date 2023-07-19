import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react'
import Visitor from './Components/Visitor/Visitor.js';
import LoadingScreen from './Components/Spinner/Spinner.js'
import {Card, Button} from 'flowbite-react'
import CreateAccount from './Components/CreateAccount/CreateAccount.js'
import AccountCreated from './Components/CreateAccount/AccountCreated.js'
import SignIn from './Components/SignIn/SignIn.js'
import Cookies from 'js-cookie'



function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModal2, setIsOpenModal2] = useState(false)
  const [isOpenModal3, setIsOpenModal3] = useState(false)
  const [userValidated, setUserValidated] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    const token = Cookies.get('token');
    const userId = Cookies.get('id');
    const username = Cookies.get('username');

    console.log(token)
    if(token && userId){
      console.log(token, userId)
      setUserValidated(true)
      setUser(username)
    }

    fetch('http://localhost:8080/items')
    .then(res => res.json())
    .then(data => {setItems(data); setLoading(false)})
  }, [userValidated, isOpenModal3])

  if(loading || items.length < 1){
    return <LoadingScreen />
  }
  return (
    <div className="App">
      {isOpenModal && <CreateAccount setIsOpenModal={setIsOpenModal} setIsOpenModal2={setIsOpenModal2} />}
      {isOpenModal2 && <AccountCreated setIsOpenModal2={setIsOpenModal2}/>}
      {isOpenModal3 && <SignIn setIsOpenModal3={setIsOpenModal3}/>}
      {!userValidated && (
        <Card >
        <div className="flex items-center justify-between border-2 border-red-500">
          <h1 className="w-fit border-2 border-red-500">Z-Prefix-Project</h1>
        <div className="flex  gap-10 w-fit border-2 border-red-500">
          <Button onClick={() => setIsOpenModal3(true)}>Sign-In</Button>
          <Button onClick={() => setIsOpenModal(true)}>Create Account</Button>
        </div>
        </div>
      </Card>
      )}
      {userValidated && (
        <Card >
        <div className="flex items-center justify-between border-2 border-red-500">
          <h1 className="w-fit border-2 border-red-500">Z-Prefix-Project</h1>
          <h1>Greetings {user}</h1>
        <div className="flex  gap-10 w-fit border-2 border-red-500">
          <Button onClick={() => {Cookies.remove('token'); Cookies.remove('id'); Cookies.remove('username'); setUserValidated(false)}}>Sign-Out</Button>
        </div>
        </div>
      </Card>
      )}

      <div  className="border-2 border-red-500">
      <Routes>
        <Route path='/*' element={<Visitor items={items}/>}/>
      </Routes>
     </div>
    </div>
  );
}

export default App;
