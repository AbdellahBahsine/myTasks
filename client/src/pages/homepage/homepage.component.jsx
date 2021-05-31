import Login from '../../components/login/login.component';

import {Link} from 'react-router-dom';

const HomePage = ({currentUser, setCurrentUser}) => {
    return (
        <div className="w-100 d-flex justify-content-center align-items-center">
            {currentUser ?
            <div>
                <h1 className="text-align-center">Hi {currentUser.username}!</h1>
                <Link to="/tasks" className="text-align-center"><h1>Go To Your Tasks Page <i className="fas fa-arrow-right"></i></h1></Link>
            </div>
            : <Login setCurrentUser={setCurrentUser} />}
        </div> 
    )
}

export default HomePage;