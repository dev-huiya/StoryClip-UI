import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function Image({ src, ...props }) {

    return (
        <React.Fragment>
            <img 
                {...props}
                src={process.env.REACT_APP_API_URL + "/images/" + src} 
            />
        </React.Fragment>
    )
}

Image.propTypes = {
    src: PropTypes.string,
}

export default Image;