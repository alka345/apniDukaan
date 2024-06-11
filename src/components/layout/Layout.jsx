import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

//used for contant components like navbar and footer is same for all page
function Layout({children}) {
  return (
    <div>
        <Navbar/>
        <div className="content">
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout