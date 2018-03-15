import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import FileShape from '../../shapes/FileShape';
import FilePreview from './FilePreview';

const propTypes = {
  files: PropTypes.arrayOf(FileShape),
  onRemove: PropTypes.func.isRequired,
};

const defaultProps = {
  files: [],
};

export default function FilePreviews({
  files,
  onRemove,
}) {
  if (!files.length) {
    return null;
  }

  return (
    <Row>
      {files.map(file => (
        <Col sm={12} key={file.id}>
          <FilePreview
            onRemove={onRemove}
            {...file}
          />
        </Col>
      ))}
    </Row>
  );
}

FilePreviews.propTypes = propTypes;
FilePreviews.defaultProps = defaultProps;
