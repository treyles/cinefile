import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

export default function ModalConductor({ modal, handleModalChange }) {
  switch (modal) {
    case 'trailer':
      return <TrailerModal handleModalChange={handleModalChange} />;
    default:
      return null;
  }
}

class TrailerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal() {
    this.props.handleModalChange(null);
  }

  render() {
    const { showModal } = this.state;

    return (
      <ReactModal
        isOpen={showModal}
        className="test-modal"
        overlayClassName="test-modal-overlay"
      >
        <button onClick={this.handleCloseModal}>Close Modal</button>
        <iframe
          title="trailer"
          src="https://www.youtube.com/embed/he21BE70f1Y?controls=0&amp;showinfo=0&amp;autoplay=1"
          frameBorder="0"
          allowFullScreen
        />
      </ReactModal>
    );
  }
}
