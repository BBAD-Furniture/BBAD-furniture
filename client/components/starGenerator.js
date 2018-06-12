import React from 'react';
const generateStars = num => {
  let starsHtml = [];
  let isDecimal = num % 1 !== 0 ? true : false;
  let newNum = Math.ceil(num);
  if (isNaN(newNum)) return ['No Reviews'];
  for (let i = 0; i <= newNum; i++) {
    if (i < newNum - 1) {
      starsHtml.push(
        <i key={i} className="fa fa-star review-star" aria-hidden="true" />
      );
    }

    if (isDecimal && i >= newNum) {
      starsHtml.push(
        <i key={i} className="fa fa-star-half review-star" aria-hidden="true" />
      );
    }
    if (!isDecimal && i >= newNum) {
      starsHtml.push(
        <i key={i} className="fa fa-star review-star" aria-hidden="true" />
      );
    }
  }
  return starsHtml;
};

export default generateStars;
