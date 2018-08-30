import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import { unit } from '../../styles/size';
import Button from '../Button';

const propTypes = forbidExtraProps({
  images: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.number.isRequired,
  widthPercent: PropTypes.number,
  defaultIndex: PropTypes.number,
  ...withStylesPropTypes,
});

const defaultProps = {
  images: [],
  defaultIndex: 0,
  widthPercent: 100,
};

export class UnstyledCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.state = {
      currentIndex: this.props.defaultIndex,
    };
  }

  onClickPrev() {
    this.setState(state => ({
      currentIndex: ((state.currentIndex - 1) + this.props.images.length) % this.props.images.length,
    }));
  }

  onClickNext() {
    this.setState(state => ({
      currentIndex: (state.currentIndex + 1) % this.props.images.length,
    }));
  }

  getTranslateX() {
    const { currentIndex } = this.state;
    const { widthPercent } = this.props;

    return `-${widthPercent * currentIndex}%`;
  }

  renderNext() {
    const { currentIndex } = this.state;
    const { images, styles } = this.props;

    if (currentIndex === images.length - 1) {
      return null;
    }

    return (
      <div {...css(styles.navButton, styles.next)}>
        <Button onPress={this.onClickNext}>
          Next
        </Button>
      </div>
    );
  }

  renderPrev() {
    const { currentIndex } = this.state;
    const { styles } = this.props;

    if (currentIndex === 0) {
      return null;
    }

    return (
      <div {...css(styles.navButton, styles.prev)}>
        <Button onPress={this.onClickPrev}>
          Previous
        </Button>
      </div>
    );
  }

  render() {
    const {
      images,
      styles,
      height,
      widthPercent,
    } = this.props;

    if (!images.length) {
      return null;
    }

    return (
      <div {...css(styles.carousel, { height })}>
        <div {...css(styles.carouselSlider, { transform: `translateX(${this.getTranslateX()}) translateZ(0)` })}>
          {images.map(image => (
            <div
              key={image}
              {...css(
                styles.carouselItem,
                {
                  width: `${widthPercent}%`,
                  paddingRight: widthPercent === 100 ? 0 : 1.5 * unit,
                },
              )}
            >
              <div
                {...css(styles.carouselImage, { backgroundImage: `url(${image})` })}
              />
            </div>
          ))}
        </div>
        {this.renderNext()}
        {this.renderPrev()}
      </div>
    );
  }
}

UnstyledCarousel.propTypes = propTypes;
UnstyledCarousel.defaultProps = defaultProps;

export default withStyles(({ color, unit }) => ({
  carousel: {
    position: 'relative',
    overflow: 'hidden',
  },

  carouselSlider: {
    transition: 'transform 500ms ease',
    whiteSpace: 'nowrap',
    height: '100%',
  },

  carouselImage: {
    backgroundColor: color.core.white,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },

  carouselItem: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
  },

  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },

  prev: {
    left: unit,
  },

  next: {
    right: unit,
  },
}))(UnstyledCarousel);
