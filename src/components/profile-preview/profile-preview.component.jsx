import React from 'react'
import CustomButton from '../custom-button/custom-button.component'

import './profile-preview.styles.scss'

/*

  Moglo se odraditi i pomocu Hook-ova ali
  zbog velikog broja state-ova bolje je klasa.

  Uzima email adresu korisnika i na osnovu nje
  generise 'random' sliku https://api.hello-avatar.com/adorables/email

  Props: 
    name(String)
    email(String)
    website(String)
    avatarUrl(String)

*/

class ProfilePreview extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: props.name,
      email: props.email,
      website: props.website,
      avatarUrl: props.avatarUrl,
      isAvatarToggled: false
    }
  }

  render(){
    return(
      <div className='profile-preview'>
        <img
          src={this.state.isAvatarToggled ?
            `https://api.hello-avatar.com/adorables/${this.state.email}`
            : this.state.avatarUrl}
            alt="Avatar"
            className='avatar' />
          <div className="about">
            <h4 className='name'>{this.state.name}</h4>
            <p className='email'>{this.state.email}</p>
            <a className='website' href={this.state.website}>{this.state.website}</a>
          </div>

        <CustomButton 
          onClick={() => this.setState({isAvatarToggled: !this.state.isAvatarToggled})}
          backgroundColor={this.state.isAvatarToggled ? 'lightseagreen' : ''}
          >
            Toggle avatar
        </CustomButton>
      </div>
    )
  }

}

export default ProfilePreview
