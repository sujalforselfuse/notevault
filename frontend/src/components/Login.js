import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';

export default function Login(props) {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://noteappbackend2.onrender.com/api/auth/login`, {
            method: "POST",


            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),


        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Login successfully", "success");
            history('/');
        }
        else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (

        <section class="text-gray-600 body-font relative rounded lg:w-1/2 mx-auto" style={{ backgroundColor: 'rgb(195, 165, 223)' }}>
            <form class="container px-5 py-4 mx-auto" onSubmit={handleSubmit}>
                <div class="flex flex-col text-center w-full mb-0">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900" >Login Your Account</h1>

                </div>
                <div class="lg:w-1/2 md:w-2/3 mx-auto">
                    <div class="flex flex-wrap -m-2">
                        
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email" value={credentials.email} placeholder="Enter your email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange} />
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                                <input type="password" id="password" name="password" value={credentials.password} placeholder="Enter your password" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange}></input>
                            </div>
                        </div>
                        

                        <div class="p-2 w-full">
                            <button class="flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type='submit' style={{ backgroundColor: "rgb(45, 5, 74)" }}>Login</button>
                        </div>

                        <div class="p-2 w-full" style={{ textAlign: "center" }}>
                            OR
                        </div>

                        <div class="p-2 w-full">
                            <Link to="/signup"> <button class="flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type='submit' style={{ backgroundColor: "rgb(45, 5, 74)" }}> Signup</button></Link>
                        </div>



                    </div>
                </div>
            </form>
        </section>
    )
}

/*  <div className='mt-3'>
     <h2>Login to continue the NoteBook</h2>
     <form onSubmit={handleSubmit}>
         <div className="mb-3">
             <label htmlFor="email" className="form-label">Email address</label>
             <input type="email" className="form-control" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" onChange={handleChange}/>
                 <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
         </div>
         <div className="mb-3">
             <label htmlFor="password" className="form-label">Password</label>
             <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={handleChange}/>
         </div>
         
         <button type="submit" className="btn btn-primary">Submit</button>
     </form>
 </div> */