import { BrowserRouter, Route, Routes, useLocation, matchRoutes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect, useState } from 'react';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import ProductUpload from './pages/productUpload';
import Category from './pages/Category';
import CategoryAdd from './pages/CategoryAdd';
import CategoryEdit from './pages/CategoryEdit';
import { useParams } from 'react-router-dom';

const MyContext = createContext();

function AppWrapper() {
  const location = useLocation();
  const { id } = useParams();

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? savedTheme === 'light' : true;
  });

  useEffect(()=>{
  if(themeMode===true){
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    localStorage.setItem('themeMode','light');
  }
  else{
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    localStorage.setItem('themeMode','dark');
  }
  },[themeMode]);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    themeMode,
    setThemeMode
  };

  const routes = [
    { path: "/" },
    { path: "/dashboard" },
    { path: "/login" },
    { path: "/signUp" },
    { path: "/products" },
    { path: "/product/details" },
    { path: "/product/upload" },
    { path: "/category" },
    { path: "/category/add" },
    { path: "/category/edit/:id" }
  ];

  const matchedRoutes = matchRoutes(routes, location);

  const hideLayout = !matchedRoutes || ['/login', '/signUp'].includes(location.pathname);

  return (
    <MyContext.Provider value={values}>
      {
        !hideLayout && <Header />
      }
      <div className='main d-flex'>
        {
          !hideLayout && 
          <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
            <Sidebar />
          </div>
        }

        <div className={`content ${hideLayout ? 'full' : ''} ${isToggleSidebar ? 'toggle' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/details" element={<ProductDetails />} />
            <Route path="/product/upload" element={<ProductUpload />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/add" element={<CategoryAdd />} />
            <Route path="/category/edit/:id" element={<CategoryEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
export {MyContext}