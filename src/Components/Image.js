import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Skeleton from 'react-loading-skeleton';

function Image({ src = null, ...props }) {

    // TODO: service worker에 token 전달이 이미지 호출보다 늦어 
    // 토큰이 있음에도 불구하고 이미지를 불러오지 못하는 경우가 있음.
    // 개선 방안 생각해볼 것.
    // 2020-12-27 hw.kim
    // 리듀서가 적용된다면 사용자 정보 객체가 갱신되는 것을 감지하여 이미지를 다시 불러오면 될것 같음
    // 2020-12-28 00:40 hw.kim

    const [imgSrc, setSrc] = useState(src);

    useEffect(()=>{
        !!src && setSrc(process.env.REACT_APP_API_URL + "/images/" + src);
    }, [src, imgSrc])

    return (
        <React.Fragment>
            {!imgSrc
                ? <Skeleton
                    {...props}
                />
                : <img
                    {...props}
                    src={imgSrc}
                    // onError={}
                />
            }
        </React.Fragment>
    )
}

Image.propTypes = {
    src: PropTypes.string,
}

export default Image;