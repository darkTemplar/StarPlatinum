import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import FileShape from '../../shapes/FileShape';
import ImagePreview from './ImagePreview';

const propTypes = {
  files: PropTypes.arrayOf(FileShape),
  onRemove: PropTypes.func.isRequired,
};

const defaultProps = {
  files: [],
};

export default function ImagePreviews({
  files,
  onRemove,
}) {
  if (!files.length) {
    return null;
  }

  return (
    <Row>
      {files.map(file => (
        <Col md={4} sm={6} lg={3} key={file.id}>
          <ImagePreview
            onRemove={onRemove}
            {...file}
          />
        </Col>
      ))}
    </Row>
  );
}

ImagePreviews.propTypes = propTypes;
ImagePreviews.defaultProps = defaultProps;
