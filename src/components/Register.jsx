import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaImage, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { LinearGradient } from 'react-text-gradients';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const navigate = useNavigate();

  const handleChangeText = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleChangeFile = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fullname', fullname);
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('avatar', avatar);
    data.append('coverImage', coverPhoto);

    // Log the FormData entries
    for (const pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    toast.promise(
      axios.post('/api/v1/user/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
      {
        pending: 'Registering...',
        success: 'Registration successful! 🎉',
        error: 'Registration failed. Please try again.',
      }
    ).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('There was an error registering!', error);
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-slate-900">
      <div>
        <h3 className="md:text-4xl sm:text-3xl text-xl font-bold text-cyan-400">
          Welcome to <LinearGradient
   					  gradient={['to left', 'rgb(8 145 178) , white']}
					  fallbackColor="black"
  				 	>
					 VidSphere
					</LinearGradient> 🚀
        </h3>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-2 mx-4 shadow sm:rounded-lg rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  autoComplete="name"
                  required
                  className="block w-full pr-10 p-2 border rounded-md"
                  value={fullname}
                  onChange={handleChangeText(setFullname)}
                />
                <FaUser className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  className="block w-full pr-10 p-2 border rounded-md"
                  value={username}
                  onChange={handleChangeText(setUsername)}
                />
                <FaUser className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="block w-full pr-10 p-2 border rounded-md"
                  value={email}
                  onChange={handleChangeText(setEmail)}
                />
                <FaEnvelope className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pr-10 p-2 border rounded-md"
                  value={password}
                  onChange={handleChangeText(setPassword)}
                />
                <FaLock className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  required
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                  onChange={handleChangeFile(setAvatar)}
                />
                <FaCamera className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">
                Cover Photo
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="file"
                  id="coverPhoto"
                  name="coverPhoto"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                  onChange={handleChangeFile(setCoverPhoto)}
                />
                <FaImage className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-600 hover:underline font-semibold">
                Login Now
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-cyan-600 flex items-center justify-center text-white py-2 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <FaUserPlus className="mr-2" /> Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
