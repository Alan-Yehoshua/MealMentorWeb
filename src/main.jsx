import ReactDOM from 'react-dom/client'
import {Login} from './Login.jsx'
import {Dashboard} from './Components/DashBoard/Dashboard.jsx'
import { AddCostumer } from './Components/AddCustomer/AddCosumer.jsx'
import { AddRecipe } from './Components/AddRecipe/AddRecipe.jsx'
import { AddPlan } from './Components/AddPlan/AddPlan.jsx'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
  path: '/',
  element: <Login/>,
  //errorElement: <Error404/>,
  },
  {
    path: '/Dashboard',
    element: <Dashboard/>,
    //errorElement: <Error404/>,
  },
  {
    path: '/AddCustomer',
    element: <AddCostumer/>,
    //errorElement: <Error404/>,
  },
  {
    path: '/AddRecipe',
    element: <AddRecipe/>,
    //errorElement: <Error404/>,
  },
  {
    path: '/AddPlan',
    element: <AddPlan/>,
    //errorElement: <Error404/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
  </>,
)
