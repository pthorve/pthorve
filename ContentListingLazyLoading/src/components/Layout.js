import React from 'react';

export const Margin = props => {
  return <div style={{ margin: `${props.size}px` }}>{props.children}</div>;
};
