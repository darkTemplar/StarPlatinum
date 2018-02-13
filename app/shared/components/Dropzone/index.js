/**
 * Controller for dropzone
 */
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from '../Dropzone';
import ImagePreviews from './ImagePreviews';
import FileShape from '../../shapes/FileShape';

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

  onFilesUploaded(files) {
    const existingFilesMap = getFilesMap(this.state.files);

    files.forEach((file) => {
      existingFilesMap[file.id] = file;
    });

    this.setState({ files: Object.values(files) });
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
        {previewImages && (
          <ImagePreviews
            files={files}
            onReorder={this.onReorder}
          />
        )}
      </div>
    );
  }
}

DropzoneController.propTypes = propTypes;
DropzoneController.defaultProps = defaultProps;
