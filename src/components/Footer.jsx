import React from 'react'

const Footer = () => {
  return (
    <footer class="bg-gray-800 text-white py-6">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center">
      {/* <!-- Left Side --> */}
      <div class="mb-4 md:mb-0">
        <h1 class="text-lg font-semibold">📦 Job Hunt</h1>
        <p class="text-sm text-gray-400">© 2025 Your Comapny.All rights reserved</p>
      </div>

      {/* <!-- Right Side (Links) --> */}
      <div class="flex space-x-4">
        <a href="https://facebook.com" class="text-gray-300 hover:text-white transition">Facebook</a>
        <a href="https://twitter.com" class="text-gray-300 hover:text-white transition">Twitter</a>
        <a href="https://linkdin.com" class="text-gray-300 hover:text-white transition">Linkdin</a>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer
