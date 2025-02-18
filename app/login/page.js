// app/login/page.js
"use client"; // This marks the component as a client component
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';


function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const loginData = { username, password };

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/authenticate`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(loginData)
            })

            if(!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            dispatch(login({user: username, token: data.token}));

            //Store JWT token in Local Stored
            localStorage.setItem('authToken', data.token);
            alert('Login successful');
            window.location.href = '/booking';

        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };

    return(
        <div className='login-container'>
            <h1>Login</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                placeholder='Username'
                value ={username}
                onChange={(e)=> setUsername(e.target.value)}/>
                <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" disabled={loading}>Login</button>
                {loading ? 'Logging in ...' : ''}
            </form>
        </div>
    );
}

export default Login