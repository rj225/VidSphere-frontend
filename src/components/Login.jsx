import React, { useState } from "react";
import { LinearGradient, RadialGradient } from "react-text-gradients";
import { Link , useNavigate } from 'react-router-dom';
import axios from "axios"; 
import { toast } from 'react-toastify';
import PreviousLocation from "./utils/PreviousLocation";
import Navbar from "./Navbar";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [auth , setAuth] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  

  const handleSubmit = async(e) => {
	e.preventDefault();

	const postData = {
		email: email,
		password: password
	  };

    try {
      await toast.promise(
        axios.post('/api/v1/user/login', postData),
        {
          pending: 'Logging In.... ',
          success: 'Logged In successfully! Hold on, Redirecting..  🚀',
          error: 'Error logging in'
        }
      );

      setTimeout(() => {
        navigate(previousLocation || "/");
        }, 2000);

        const previousLocation = PreviousLocation.retrieve();

        PreviousLocation.clear();
      
    } catch (error) {
      console.error('Error:', error.response.data);
    }
    
  }

  return (
    <>
    <Navbar showSignInButton={true} uploadbutton={false}/>
      <div className="min-h-full w-full overflow-hidden py-4 flex flex-col justify-center items-center font-serif sm:py-12">
        <div className="relative md:w-full w-4/5 py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute w-full md:h-full hidden md:block h-1/2 inset-0 bg-gradient-to-r from-red-100 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative w-full md:h-full h-1/2 px-4 py-10 bg-gradient-to-r from-teal-200 to-orange-100  shadow-lg sm:rounded-3xl rounded-xl sm:p-20">
            <div className="max-w-md mx-auto">
              {/* <div>Are U Ready?</div> */}
              <div>
                <h1 className="md:text-4xl text-lg font-extrabold">
                Login to&nbsp;
                  <LinearGradient
   					  gradient={['to left', 'rgb(8 145 178) , rgb(2,0,36)']}
					  fallbackColor="black"
  				 	>
					 VidSphere
					</LinearGradient>
                  {/* <RadialGradient
                    gradient={[
                      "circle, rgba(40,212,255,1) 0%, rgb(8 145 178) 35%, rgb(2,0,36) 100%",
                    ]}
                    fallbackColor="black"
                  >
                    Media Junction
                  </RadialGradient> */}
                  🚀
                </h1>
              </div>

              <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-100">
                <div className="py-6 mt-3 md:text-base text-sm leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative mb-7 ">
                    <input
                      autoComplete="on"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full p-3 border-2 border-cyan-600 rounded-xl text-gray-900 focus:outline-none focus:border-cyan-600"
                      placeholder="Email address"
					  value={email}
					  onChange={handleEmailChange}
                    />
                    <label
                      htmlFor="email"
                      className="absolute after:content-['*'] after:ml-0.5 after:text-red-500 left-1 -top-6 text-cyan-700 text-md peer-placeholder-shown:text-cyan-700 peer-placeholder-shown:top-1.5 transition-all peer-focus:-top-6 peer-focus:left-1 bg-transparent peer-focus:text-cyan-900 peer-focus:text-md"
                    >
                      Email Address 
                    </label>
                  </div>
                  <div className="relative mb-2">
                    <input
                      autoComplete="on"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full p-3 border-2 rounded-xl border-cyan-600 text-gray-900 focus:outline-none focus:border-cyan-600"
                      placeholder="Password"
					  value={password}
					  onChange={handlePasswordChange}
                    />
                    <label
                      htmlFor="password"
                      className="absolute after:content-['*'] after:ml-0.5 after:text-red-500 left-1 -top-6 text-cyan-700 text-md peer-placeholder-shown:text-cyan-700 peer-placeholder-shown:top-1.5 transition-all peer-focus:-top-6 bg-transparent peer-focus:left-1 peer-focus:text-cyan-900 peer-focus:text-md"
                    >
                      Password
                    </label>
                  </div>
                  <div className="md:text-sm italic text-xs mb-4">
                    Don't have an account?{" "}
                    
					<Link to="/register" className="text-cyan-700 hover:underline hover:text-cyan-800 font-semibold">Sign Up / Register</Link>
                
                  </div>
                  <div className="mt-8 text-center mb-4">
                    <button type="submit" className="bg-cyan-500 w-3/5 text-white hover:drop-shadow-3xl hover:ring-[1.5px] hover:ring-cyan-800 rounded-md px-2 py-1 hover:bg-cyan-100 transition  hover:text-cyan-800">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
