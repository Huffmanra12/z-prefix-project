import {Button, Card, Label, TextInput} from 'flowbite-react'
import {useState} from 'react'


export default function CreateAccount({setIsOpenModal, setIsOpenModal2}){
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [passCheck, setPassCheck] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(confPass === password){
        await fetch('http://localhost:8080/register/createUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "password": password
            })
        })
        .then(res => res.json())
        .then(data => {
          setFirstName('');
          setLastName('');
          setUsername('');
          setPassword('');
          setConfPass('');
          setIsOpenModal(false)
          setIsOpenModal2(true)
        })

    }else{
        setPassCheck(true);
    }
};

return (
<div className="flex justify-center items-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
  <Card className="flex flex-col items-center h-fit w-fit">
    <h1 className="text-center">Create Account</h1>
    {passCheck && <p className="text-center text-red-500">Passwords Must Match</p>}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mr-40 ml-40">
        <div>
            <Label htmlFor="first_name" value="First Name" />
            <TextInput
                id="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                type="text"
                required
            />
        </div>
        <div>
            <Label htmlFor="last_name" value="Last Name" />
            <TextInput
                id="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                type="text"
                required
            />
        </div>
        <div>
            <Label htmlFor="username" value="Username" />
            <TextInput
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
                required
            />
        </div>
        <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required
            />
        </div>
        <div>
            <Label htmlFor="confPass" value="Confirm Password" />
            <TextInput
                id="confPass"
                value={confPass}
                onChange={(e) => setConfPass(e.target.value)}
                placeholder="Confirm Password"
                type="password"
                required
            />
        </div>
        <Button type="submit">Submit</Button>
    </form>
</Card>
</div>
)
}