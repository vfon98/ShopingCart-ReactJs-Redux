import React from 'react';

const Wrapper = (props) => {
    return (
        <div className="container-fluid container-lg py-4 mt-5">
            {props.children}
        </div>
    );
}

export default React.memo(Wrapper);