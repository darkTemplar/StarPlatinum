import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default class OutsideClickHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getRef = this.getRef.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseDown(e) {
    if (!this.node.contains(e.target)) {
      this.props.onOutsideClick();
    }
  }

  getRef(node) {
    this.node = node;
  }

  render() {
    return (
      <div
        ref={this.getRef}
      >
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
