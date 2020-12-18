import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';

function Input({ onChange, label, type = "text", required, autoComplete = "off", ...props }) {

    const _onChange = useCallback((e) => {
        const _target = !!e.target ? e.target : e.currentTarget;
        if(typeof onChange == "function") {
            onChange({
                type: "ChangeInput",
                name: _target.name,
                value: type.toLowerCase() != "file" ? _target.value : _target.files[0],
            })
        }
    }, []);

    const [ show, setShow ] = useState(false);

    const changeShowAtPassword = useCallback((e)=>{
        if(e.nativeEvent.type == "click") {
            setShow(!show);
        } else if(e.nativeEvent.type == "keydown") {
            if(e.keyCode == 13 || e.keyCode == 32) {
                setShow(!show);
            }
        }
    }, [show]);

    return (
        <React.Fragment>
            <div className="_input">
                {!!label && (
                    <label>{label}{required && " *"}</label>
                )}
                <div className="input-wrapper">
                    <input
                        {...props}
                        type={type != "password" ? type : show == false ? "password" : "text"}
                        onChange={_onChange}
                        required={required}
                        autoComplete={autoComplete}
                    />
                    {type == "password" && (
                        <span 
                            className="toggle"
                            tabIndex="0"
                            onClick={changeShowAtPassword}
                            onKeyDown={changeShowAtPassword}
                        >
                            {show == false ? <Icon.Eye size="18" /> : <Icon.EyeOff size="18" /> }
                        </span>
                    )}
                </div>
                
            </div>
        </React.Fragment>
    )

}

Input.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    type: PropTypes.string,
}

Input.defaultProps = {
    onChange: () => {},
    label: "",
    type: "text",
}

export default Input;