import {useState, useEffect} from 'react';
import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import RegisterPage from './pages/register/register.component';
import TasksPage from './pages/tasks/tasks.component';

import {Route, Redirect} from 'react-router-dom';

import axios from 'axios';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    axios.get('/users/me', { withCredentials:true })
    .then(res => {
      console.log(res)
      setIsLoading(false)
      if(res.data.error){
        setCurrentUser(null)
        return;
      } else{
        setCurrentUser(res.data)
      }
    })
    .catch(e => console.log(e))
  }, [])

  if(isLoading){
    return (<div className="d-flex justify-content-center align-items-center w-100 loader-container"><span className="loader"></span></div>)
  } else{
    return (
      <div className="app">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <main className="d-flex justify-content-center align-items-center py-4">
          <Route exact path="/" component={() => <HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          {currentUser ? <Redirect to="/" /> : <Route exact path="/register" component={() => <RegisterPage setCurrentUser={setCurrentUser} />} />}
          {currentUser ? <Route exact path="/tasks" component={TasksPage} /> : <Redirect to="/" />}
        </main>
      </div>
    )
  }
}

export default App;
