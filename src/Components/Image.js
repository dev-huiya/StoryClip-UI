import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function Image({ src, ...props }) {

    // TODO: service worker에 token 전달이 이미지 호출보다 늦어 
    // 토큰이 있음에도 불구하고 이미지를 불러오지 못하는 경우가 있음.
    // 개선 방안 생각해볼 것.
    // 2020-12-27 hw.kim

    return (
        <React.Fragment>
            <img 
                {...props}
                src={process.env.REACT_APP_API_URL + "/images/" + src} 
                // onError={}
            />
        </React.Fragment>
    )
}

Image.propTypes = {
    src: PropTypes.string,
}

export default Image;