import React from 'react'

const IconComponent = ({logo: Logo, color, className}: any) => {
  return (
    <Logo className={className} style={{color}} />
  )
}

export default IconComponent