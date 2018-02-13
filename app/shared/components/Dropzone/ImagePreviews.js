import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import FileShape from '../../shapes/FileShape';
import ImagePreview from './ImagePreview';

const propTypes = {
  files: PropTypes.arrayOf(FileShape),
};

const defaultProps = {
  files: [],
};

export default class ImagePreviews extends React.PureComponent {
  render() {
    const { files } = this.props;

    if (!files.length) {
      return null;
    }

    return (
      <Row>
        {files.map(file => (
          <Col md={4} sm={2} lg={3} key={file.id}>
            <ImagePreview />
          </Col>
        ))}
      </Row>
    );
  }
}

ImagePreviews.propTypes = propTypes;
ImagePreviews.defaultProps = defaultProps;
