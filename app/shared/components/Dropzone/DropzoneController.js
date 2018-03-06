/**
 * Controller for dropzone
 */
import PropTypes from 'prop-types';
import React from 'react';

import Dropzone from './';
import FileShape from '../../shapes/FileShape';
import ImagePreviews from './ImagePreviews';
import Spacing from '../Spacing';

const propTypes = {
  previewImages: PropTypes.bool,
  previewFiles: PropTypes.bool,
  initialFiles: PropTypes.arrayOf(FileShape),
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  initialFiles: [],
  previewImages: false,
  previewFiles: false,
};

function getFilesMap(files) {
  return files.reduce((result, file) => ({
    ...result,
    [file.id]: file,
  }), {});
}

export default class DropzoneController extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFilesUploaded = this.onFilesUploaded.bind(this);
    this.onReorder = this.onReorder.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      files: this.props.initialFiles,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.files !== prevState.files) {
      this.props.onChange(this.state.files);
    }
  }

  onReorder(idOrder) {
    const filesMap = getFilesMap(this.state.files);

    const orderedFiles = idOrder.filter(id => !!filesMap[id]).map((id) => {
      const returnValue = filesMap[id];
      delete filesMap[id];

      return returnValue;
    });

    const allOrderedFiles = orderedFiles.concat(Object.values(filesMap));
    this.setState({ files: allOrderedFiles });
  }

  onRemove(id) {
    this.setState({
      files: this.state.files.filter(file => file.id !== id),
    });
  }

  onFilesUploaded(files) {
    const existingFilesMap = getFilesMap(this.state.files);

    files.forEach((file) => {
      existingFilesMap[file.id] = file;
    });

    this.setState({ files: Object.values(existingFilesMap) });
  }

  render() {
    const { previewImages, previewFiles, ...otherProps } = this.props;
    const { files } = this.state;

    return (
      <div>
        <Dropzone
          onFilesUploaded={this.onFilesUploaded}
          {...otherProps}
        />
        {!!(previewImages && files.length) && (
          <Spacing top={2}>
            <ImagePreviews
              files={files}
              onRemove={this.onRemove}
              onReorder={this.onReorder}
            />
          </Spacing>
        )}
      </div>
    );
  }
}

DropzoneController.propTypes = propTypes;
DropzoneController.defaultProps = defaultProps;
