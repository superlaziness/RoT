import React from 'react';

const ProgressBar = (props) => {
  const containerStyle = {
    marginTop: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '600px',
    height: '100px',
    position: 'relative',
    backgroundColor: '#F0F8FF',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '100px',
  };
  const innerDivStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#F0F8FF',
    width: (600 / 100 * Math.abs(props.value)),
    zIndex: '0',
  };
  const textCentred = {
    position: 'relative',
    zIndex: '1',
  };

  props.value >= 0
    ? innerDivStyle.backgroundColor = '#7FFFD4'
    : innerDivStyle.backgroundColor = '#DC143C';

  return (
    <div style={containerStyle}>
      <h1 style={textCentred}>{props.value}</h1>
      <div style={innerDivStyle} />
    </div>
  );
};

export default ProgressBar;
