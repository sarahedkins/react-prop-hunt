import React from 'react';

export const DisplayName = ({ nameToDisplay }) => {
  const color = "purple";
  return (
    <div className="flex flex-column flex-align-items-center pad-30 fancy-font">
      {`${nameToDisplay} likes ${color}`}
    </div>
  );
};

export default DisplayName;
