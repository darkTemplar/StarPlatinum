import React from 'react';
import PropTypes from 'prop-types';
import ListPropertyIconSvg from '../../svgs/list_property.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function ListPropertyIcon({
  size,
  color,
}) {
  return <ListPropertyIconSvg width={size} height={size} fill={color} />;
}

ListPropertyIcon.propTypes = propTypes;
ListPropertyIcon.defaultProps = defaultProps;
