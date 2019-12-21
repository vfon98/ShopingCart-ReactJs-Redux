import React from 'react';

const NotFound404 = () => {
    return (
        <div className='jumbotron text-center' id='not-found-page'>
            <i className="fa fa-frown-o text-danger"></i>
            <h1>404 - Page not found</h1>
            <code>Please check your URL and try again!</code>
        </div>
    );
}

export default NotFound404;
