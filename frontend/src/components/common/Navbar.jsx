import { Link } from 'react-router-dom';

function Navbar() {
    return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">React</Link>
            </div>

            <div className="flex items-center space-x-16">
              <Link to="/" className="text-gray-600 hover:text-[#007edf]">Home</Link>
              
              <div className="relative group">
                <Link to="/electronics" className="text-gray-600 hover:text-[#007edf] inline-flex items-center">
                    Electronics
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </Link>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                        <Link to="/electronics/tv" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#007edf]">
                            TV & Home Theater
                        </Link>
                        <Link to="/electronics/computers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#007edf]">
                            Computers & smartphones
                        </Link>
                        <Link to="/electronics/tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#007edf]">
                            Home tools
                        </Link>
                    </div>
                </div>
              </div>

              <div className='relative group'>
                <Link to="/food" className='text-gray-600 hover:text-[#007edf] inline-flex items-center'>
                    Food
                    <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                </Link>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                        <Link to="/food/groceries" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#007edf]">
                            Groceries
                        </Link>
                        <Link to="/food/prepared-meals" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#007edf]">
                            Prepared Meals
                        </Link>
                        <Link to="/food/snacks-beverages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#007edf]">
                            Snacks & Beverages
                        </Link>
                    </div>
                </div>                    
              </div>

              <div className='relative group'>
                <Link to="/about" className="text-gray-600 hover:text-[#007edf] inline-flex items-center">
                    About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar