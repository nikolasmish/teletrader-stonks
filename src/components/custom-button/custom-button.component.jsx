import React from 'react'

import './custom-button.styles.scss'

const CustomButton = ({children, onClick, type, color, backgroundColor}) => {
  return (
    <button className="custom-button" style={{color: `${color}`, background:`${backgroundColor}`}} type={type} onClick={onClick}>{children}</button>
  )
}

export default CustomButton
