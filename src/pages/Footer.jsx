import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; 2025 Habit Tracker. Build By Creation</p>
        <div className="flex justify-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span className="text-gray-500">|</span>
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer