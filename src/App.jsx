import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "../src/modules/Shared/components/AuthLayout/AuthLayout"
import Login from "../src/modules/Authentication/components/Login/Login"
import Register from "../src/modules/Authentication/components/Register/Register"
import ResetPass from "../src/modules/Authentication/components/ResetPass/ResetPass"
import ForgetPass from "../src/modules/Authentication/components/ForgetPass/ForgetPass"
import MasterLayout from "../src/modules/Shared/components/MasterLayout/MasterLayout"
import NotFound from "../src/modules/Shared/components/NotFound/NotFound"
import Home from '../src/modules/Home/components/Home/Home'
import CategoriesList from '../src/modules/Categories/components/CategoriesList/CategoriesList'
import RecipesList from "../src/modules/Recipes/components/RecipesList/RecipesList"
import UsersList from "../src/modules/Users/components/UsersList/UsersList"
import { ToastContainer } from 'react-toastify'
import Protection from './modules/Shared/components/ProtectionGurd/Protection'
import Addrecipe from './modules/Recipes/components/RecipesList/addrecipe/Addrecipe'
import Verify from './modules/Authentication/components/verify/Verify'
import CreateAdmin from './modules/Users/components/Addadmin/CreateAdmin'
// import UpdateRecipe from './modules/Recipes/components/updaterecipe/UpdateRecipe'
function App() {
  // use blocker

  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "reset", element: <ResetPass /> },
        { path: "forget", element: <ForgetPass /> },
        { path: "verify", element: <Verify /> }
      ]
    },
    {
      path: "dashboard",
      element: <Protection><MasterLayout /></Protection>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "add-recipe", element: <Addrecipe /> },
        { path: "updaterecipe/:id", element: <Addrecipe /> },
        { path: "add-admin", element: <CreateAdmin /> },
        { path: "users", element: <UsersList /> }
      ]
    }
  ])



  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />

    </>
  )
}

export default App
