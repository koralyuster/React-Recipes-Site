import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './css_components/nav_header.css';
import './css_components/cardsRecipe.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import Login from './components/login';
import Singup from './components/singup';
import About from './components/about';
import FavRecipes from './components/favRecipes';
import MyRecipes from './users/myRecipes';
import { useEffect, useState } from 'react';
import { updateUserData } from './services/userSer';
import ProtectedRoute from './components/protectedRoute';
import AddRecipe from './users/addRecipe';
import EditRecipe from './users/editRecipe';
import DetailRecipe from './components/detailRecipe';
import Page404 from './components/page404';

function App() {

  let [user, setUser] = useState(null);

  useEffect(() => {
    ifUserLogin();
  }, []);

  const ifUserLogin = async() => {
    let data = await updateUserData();
    setUser(data);
  }

  return (
    <Router>
      <header className="container-fluid shadow-sm">
      {user && <Route path="/" component={Navbar}></Route> }
      </header>
      {user &&
        <main className="container-fluid" style={{minHeight:"80vh"}}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/detailRecipe/:id" component={DetailRecipe}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/singup" component={Singup}></Route>
            <ProtectedRoute path="/favorite" comp={FavRecipes}></ProtectedRoute>
            <ProtectedRoute path="/myRecipes" comp={MyRecipes}></ProtectedRoute>
            <ProtectedRoute path="/addRecipe" comp={AddRecipe}></ProtectedRoute>
            <ProtectedRoute path="/editRecipe/:id" comp={EditRecipe}></ProtectedRoute>
            <Route path="/" component={Page404}></Route>
          </Switch>
        </main> 
      }
      <footer>
        <Footer></Footer>
      </footer>
      <ToastContainer position="bottom-right"></ToastContainer>
    </Router>
  );
}

export default App;
