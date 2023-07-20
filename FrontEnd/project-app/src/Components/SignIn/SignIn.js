import {Button, Card, Label, TextInput} from 'flowbite-react'
import {useState} from 'react'
import Cookies from 'js-cookie'


export default function SignIn({setIsOpenModal3, Navigate}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then(res => res.json())
    .then(data => {
      Cookies.set('token', data.token);
      Cookies.set('id', data.id)
      Cookies.set('username', data.username)
    })
    .then(() => {
      Navigate('/user/items')
      setIsOpenModal3(false)
    })
  }


  return(
  <div className="flex justify-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
    <Card className="flex flex-col mt-40 items-center h-fit w-fit">
      <div className="flex">
      <h1 className="flex w-full justify-center">Sign In</h1>
      <p className="flex cursor-pointer" onClick={() => setIsOpenModal3(false)}>X</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="username" value="Username" />
        <TextInput
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
          required
          />
          <div className="mt-4">
        <Label htmlFor="password" value="Password"/>
        <TextInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          />
          </div>
        <div className="flex justify-center mt-4">
        <Button type="submit">Log In</Button>
        </div>
      </form>
    </Card>
  </div>
  )
}