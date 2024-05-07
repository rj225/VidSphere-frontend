import React from "react";
import { Link } from "react-router-dom";


export default function Register() {


  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");


  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-slate-900">
      <div>
        <h3 className="text-4xl font-bold text-cyan-400"> Media Junction 🚀</h3>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mt-4 text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-cyan-600 hover:underline font-semibold"
              >
                Login Now
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
