// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import { BrowserRouter, Routes } from 'react-router-dom'
import Landing from './components/landing'
import Driver from './components/driver-signup'
import Customer from './components/customer-signup'
import Login from './components/login'
import AccountVerification from './components/account-verification'
import CustomerHome from './components/customer-homepage'
import Booking from './components/booking'


function App() {
  // const [count, setCount] = useState(0)

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Landing/>}/>
        <Route path='/driver-signup' element ={<Driver/>}/>
        <Route path='/customer-signup' element ={<Customer/>}/>
        <Route path='/login'element ={<Login/>}/>
        <Route path= '/account-verification' element={<AccountVerification/>}/>
        <Route path = 'customer-homepage' element ={<CustomerHome/>}/>
        <Route path='/booking' element = {<Booking/>}/>
      </Routes> 
    </BrowserRouter>
  )  
}

export default App

