import React from 'react'
import { connect } from 'react-redux'

import ProfilePreview from '../../components/profile-preview/profile-preview.component'

import './profile.styles.scss'

/*

  Proverava da li je korisnik ulogovan,
  ukoliko jeste, prikazi njegov profil,
  ukoliko nije, prikazi poruku.

  Ovde bi bila korisna neka login komponenta,
  ili redirect na login page.

*/

const ProfilePage = (props) => {
  return (
    <div className='profile-page'>
      {
        props.currentUser ? 
        (
          <ProfilePreview name='Goran Urukalo' email='goran.urukalo@teletrader.com' avatarUrl='https://picsum.photos/285/285' website='https://goranurukalo.github.io' />
          
        )
        :
        <p>You need to login to access this page</p>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(ProfilePage)
