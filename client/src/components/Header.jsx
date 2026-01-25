import { LogOut, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../services/api';
import axios from 'axios';
const Header = ({ logout }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true
      });

      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-white rounded-lg p-2 mr-3 shadow-lg">
              <img src="./TaskBoard_logo.png" alt='logo' className='w-60 bg-contain' />
            </div>
            {/* <h1 className="text-2xl font-bold text-white">
              TaskBoard
            </h1> */}
          </div>
          <div className="flex items-center gap-4">
            {userData && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <div className="bg-white/20 rounded-full p-2">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {userData.firstname} {userData.lastname}
                  </span>
                  <span className="text-xs text-blue-100">
                    {userData.email}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-200 hover:scale-105"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
