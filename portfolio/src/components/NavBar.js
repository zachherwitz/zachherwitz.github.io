import React from 'react'

class NavBar extends React.Component {
  render = () => {
    return <nav>
      <div>PROJECTS</div>
      <div>BIO</div>
      <div onClick={this.props.toggleResume}>RESUME</div>
      <div>SOCIALS BOX</div>
    </nav>
  }
}

export default NavBar
