import React from 'react';
const SaleSign = props => {
  const {
    sign,
    primaryColor,
    signHeader,
    secondaryColor,
    signDate,
    signSize
  } = props;
  const { width, height } = signSize;
  return (
    <div
      style={{ color: primaryColor, height, width }}
      className="single-sign flex column items-center "
    >
      <span className="sale-single-sign__header h-20 margin-0">
        {signHeader}
      </span>
      <div className="flex align-center justify-center h-20">
        <span
          style={{ color: secondaryColor }}
          className="sale-single-sign__product-name margin-0"
        >
          {sign.C}
        </span>
      </div>
      <div className="flex align-center justify-center h-40">
        {sign.I === 'b1g1f' ? (
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src="https://firebasestorage.googleapis.com/v0/b/westchesteremployeeportal.appspot.com/o/download.jpeg?alt=media&token=1c6f1f80-0fdf-4ec6-ac48-e32561893948"
          />
        ) : (
          <span className="sale-single-sign__product-price  margin-0">
            {sign.I}
          </span>
        )}
      </div>
      <span
        style={{ color: secondaryColor }}
        className="sale-single-sign__product-size h-15 margin-0"
      >
        {sign.H}
      </span>
      <span className="sale-single-sign__valid-dates h-10 margin-0 padding-0">
        {signDate}
      </span>
    </div>
  );
};

export default SaleSign;
