import React from "react";

const LoadingButton = () => {
  return (
    <div>
      <button className='btn btn-lg btn-danger font-weight-bold mt-1'>
        <i className='fa fa-cog fa-spin mr-2 fa-lg'></i>Loading...
      </button>
    </div>
  );
};

export default React.memo(LoadingButton);
