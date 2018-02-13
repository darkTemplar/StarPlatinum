import PropTypes from 'prop-types';
import React from 'react';
import ReactDropzone from 'react-dropzone';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import { greys } from '../styles/color';
import { unit } from '../styles/size';

const ACCEPT_AUDIO = 'audio/*';
const ACCEPT_VIDEO = 'video/*';
const ACCEPT_IMAGE = 'image/*';
const ACCEPT_FILES = 'application/*';

const propTypes = {
  // Required props
  onFilesUploaded: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,

  // Optional props for dropzone to configure to your needs
  acceptAudio: PropTypes.bool,
  acceptVideo: PropTypes.bool,
  acceptImage: PropTypes.bool,
  acceptApplication: PropTypes.bool,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  style: PropTypes.any,
  activeStyle: PropTypes.any,
  acceptStyle: PropTypes.any,
  rejectStyle: PropTypes.any,
  disabledStyle: PropTypes.any,
  ...withStylesPropTypes,
};

const defaultProps = {
  multiple: true,
  acceptAudio: false,
  acceptVideo: false,
  acceptApplication: false,
  acceptImage: true,
  maxSize: undefined,
  style: {
    width: '100%',
    border: `${unit / 4}px dashed ${greys.haze}`,
    padding: 2 * unit,
  },
};

const filesMap = {

};

export class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      files: [],
    };
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const { onFilesUploaded } = this.props;
    const filesPromises = [];

    acceptedFiles.forEach((file) => {
      const baseFileData = {
        name: file.name,
        lastModified: file.lastModified,
        type: file.type,
        size: file.size,
      };

      filesPromises.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const fileAsBinaryString = reader.result;

            resolve({
              ...baseFileData,
              content: btoa(fileAsBinaryString),
            });
          };
          reader.onabort = () => {
            reject(baseFileData);
          };
          reader.onerror = () => {
            reject(baseFileData);
          };
          reader.readAsBinaryString(file);
        }),
      );
    });

    Promise.all(filesPromises)
      .then((base64EncodedFiles) => {
        onFilesUploaded(base64EncodedFiles);
      });
  }

  render() {
    const {
      children,
      multiple,
      style,
      activeStyle,
      acceptStyle,
      rejectStyle,
      disabledStyle,
      acceptImage,
      acceptAudio,
      acceptApplication,
      acceptVideo,
      maxSize,
      styles,
    } = this.props;

    const accept = [
      acceptImage ? ACCEPT_IMAGE : '',
      acceptAudio ? ACCEPT_AUDIO : '',
      acceptVideo ? ACCEPT_VIDEO : '',
      acceptApplication ? ACCEPT_FILES : '',
    ].filter(m => !!m).join(', ');

    return (
      <div {...css(styles.dropzoneContainer)}>
        <ReactDropzone
          onDrop={this.onDrop}
          style={style}
          accept={accept}
          activeStyle={activeStyle}
          acceptStyle={acceptStyle}
          rejectStyle={rejectStyle}
          disabledStyle={disabledStyle}
          multiple={multiple}
          maxSize={maxSize}
        >
          {children}
        </ReactDropzone>
      </div>
    );
  }
}

Dropzone.propTypes = propTypes;
Dropzone.defaultProps = defaultProps;

export default withStyles(() => ({
  dropzoneContainer: {
    cursor: 'pointer',
  },
}), { pureComponent: true })(Dropzone);
