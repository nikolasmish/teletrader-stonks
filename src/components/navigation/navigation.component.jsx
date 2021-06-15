import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {setCurrentUser} from '../../redux/user/user.actions'

import CustomButton from '../custom-button/custom-button.component'

import './navigation.styles.scss'

/*

  Proverava da li je korisnik ulogovan, state dobija
  iz React Redux stora.

  * Mozda sam mogao i Login dugme da napravim kao zasebnu
  komponentu ukoliko hocemo da Login koristimo i negde
  drugde (?)

*/

export const Navigation = (props) => {
  const handleLogin = () => {
    // if(!props.currentUser)
      props.setCurrentUser(true)
    // else props.setCurrentUser(false)
  }

  return (
    <div className="navigation">
      <ul>
        <li>
          <h2>Navbar</h2>
        </li>
        <li>
          <NavLink activeClassName='current-active' to='/' exact>
            <p>Home</p>
          </NavLink>
        </li>
        {
          props.currentUser ? 
          (
          <NavLink activeClassName='current-active' to='/profile'>
            <li><p>Profile</p></li>
          </NavLink>
          )
          : null
        }
      </ul>

      {
        // Kao receno u zadatku, korisnik nema mogucnost logout-a
        props.currentUser ?
        null : <CustomButton onClick={() => handleLogin()}>Login</CustomButton>
      }

      

    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
