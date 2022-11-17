import React from 'react';

import {Link, useNavigate} from 'react-router-dom'
const Nav=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img className="logo" alt='Logo' src={require('./product_img.png')} />
           {auth? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                {/* <li><Link to="/update" href="/">Update Products</Link></li> */}
                {/* <li><Link to="/profile">Profile</Link></li> */}
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                
            </ul> 
            :<ul>
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </ul>
                }
        </div>
    )
}

export default Nav;