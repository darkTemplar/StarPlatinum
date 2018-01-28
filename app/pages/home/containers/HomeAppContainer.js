import React from 'react';

import { connect } from 'react-redux';

export function HomeAppContainer({
  foo,
}) {
  return (
    <div>
      HELLO WORLD {foo}
    </div>
  );
}

export default connect(({ myReducer }) => ({
  foo: myReducer.foo,
}))(HomeAppContainer);
