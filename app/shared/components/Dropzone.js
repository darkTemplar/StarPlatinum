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

export class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      files: [],
    };
  }

  onDrop(acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;


      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
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
