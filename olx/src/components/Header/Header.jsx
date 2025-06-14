import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';


function Header() {
  const { user,logout } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>

        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>

        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>

        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>

        <div className="loginPage">
          {user ? (
            <>
              <span>Welcome, {user.username || user.displayName}</span>
              
              
              <span onClick={logout} className="logoutBtn">Logout</span>
            </>
          ) : (
            <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
      Login
    </span>
          )}
          <hr />
        </div>

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span onClick={() => navigate('/Create')} style={{ cursor: 'pointer' }}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
