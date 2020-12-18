import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// TODO: props 값을 미리 정의해놓고 그 중에서만 선택할 수 있도록 강제할 것.

function Button({ label, color, className, disabled, isLoading, ...props }) {

    const _color = !!color ? color : "blue"

    return (
        <React.Fragment>
            <div className="_button">
                <button
                    {...props}
                    className={_color + (!!className ? " "+className : "")}
                    disabled={!!isLoading && disabled == false ? isLoading : disabled}
                >
                    {isLoading == false && (
                        <React.Fragment>
                            {label}
                        </React.Fragment>
                    )}
                    {isLoading == true && (
                        <i className="icon-spin3 animate-spin"></i>
                    )}
                    
                </button>
            </div>
        </React.Fragment>
    )

}

Button.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    onClick: () => {},
    label: "",
    color: "blue",
    className: "",
    isLoading: false,
    disabled: false,
}

export default Button;