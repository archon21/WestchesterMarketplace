import React from 'react';

const Flex = props => {
  const {
    className,
    backgroundColor,
    maxWidth,
    column,
    padding,
    style,
    width,
    justify,
    align
  } = props;
  return (
    <div
      style={style}
      className={`${backgroundColor && backgroundColor}
        ${justify ? justify : 'justify-center'}
        ${align ? align : 'align-center'}
       ${padding && padding}
       flex ${column ? 'column' : 'row'}
       ${width ? width : 'w-100'}
      ${maxWidth && maxWidth}
      ${className && className}
      wrap  maxw-100vw`}
    >
      {props.children}
    </div>
  );
};

export default Flex;
