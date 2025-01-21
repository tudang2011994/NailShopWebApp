"use client"; // This marks the component as a client component
import {useState} from 'react'

function Register(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail]= useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError(null)
        setLoading(false)

        const registerData = {username,password,email};

        try{
            const response = await fetch('https://localhost:44361/api/User/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(registerData)}

            )

            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }

            window.location.href = '/booking' 
            
        } catch(error) {
            setError(error.message)
        }
        
    }

    return (
        <div className='register-container'>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                type ='text'
                placeholder='Username'
                onChange={(e)=>setUsername(e.target.value)}
                value = {username} 
                />
                <input
                type ='password'
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                value = {password }
                />
                <input
                type ='email'
                placeholder='Email'
                onChange={(e)=>setEmail(e.target.value)}
                value = {email}
                />
                <button type='submit' disabled={loading}>Register</button>
                {loading ? 'Register in ...' : ''}
            </form>
        </div>
    )
}

export default Register