import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';
import {auth} from "../../firebase/firebase.utils";

// modify component to have access to redux
import {connect} from "react-redux";
import CartIcon from "../card-icon/card-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({currentUser, hidden}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
        currentUser ?
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
          :
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
      }

      <CartIcon />
    </div>
    { hidden ? null : <CartDropdown /> }
  </div>
);

// this naming can be anythin, but matStateToProps
// is standard with redux codebases
// we need pass properties like props in owr component
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);
