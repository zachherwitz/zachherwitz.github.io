import React from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import NavBar from './components/NavBar'
import Resume from './pdf/resume.pdf'

class App extends React.Component {
  state = {
    resumeShow: false
  }

  toggleResume = () => {
    this.setState({
      resumeShow:!this.state.resumeShow
    })
  }

  render = () => {
    return <div className="site-container">
      <NavBar toggleResume={this.toggleResume}/>
      <div className="portrait"></div>
      {this.state.resumeShow ?
        <Modal
          show={this.state.resumeShow}
          onHide={this.toggleResume}
          dialogClassName="resume-modal"
          size="lg">
          <ModalBody>
            <iframe src={Resume} title="Zach Herwitz Resume"></iframe>
          </ModalBody>
        </Modal>
        : null}
    </div>
  }
}

export default App;
