import React from 'react';
import PropTypes from 'prop-types';
import WatchlistsIconSvg from '../../svgs/watchlists.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function WatchlistsIcon({
  size,
  color,
}) {
  return <WatchlistsIconSvg width={size} height={size} fill={color} />;
}

WatchlistsIcon.propTypes = propTypes;
WatchlistsIcon.defaultProps = defaultProps;
