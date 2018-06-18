import { forbidExtraProps } from 'airbnb-prop-types';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
});

const defaultProps = {
  as: undefined,
};

export default function RoutingLink({
  children,
  href,
  as,
}) {
  return (
    <NextLink href={href} as={as}>
      <a>{children}</a>
    </NextLink>
  );
}

RoutingLink.propTypes = propTypes;
RoutingLink.defaultProps = defaultProps;
