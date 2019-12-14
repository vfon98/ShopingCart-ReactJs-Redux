import React from 'react';

const Wrapper = (props) => {
    return (
        <div className="container py-3 border">
            {props.children}
        </div>
    );
}

export default React.memo(Wrapper);
