import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';

function Input({ onChange, label, type = "text", required, autoComplete = "off", ...props }) {

    const _onChange = useCallback((e) => {
        const _target = !!e.target ? e.target : e.currentTarget;
        if(typeof onChange == "function") {
            let value = "";
            
            switch(type.toLowerCase()) {
                case "file" :
                    value = _target.files[0] || null;
                    break;
                case "checkbox" :
                    value = _target.checked ? true : false;
                    break;
                default:
                    // 단순한 input text 일 경우
                    value = _target.value;
            }
            
            onChange({
                type: "ChangeInput",
                name: _target.name,
                value: value,
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
            } else if(e.keyCode != 9) {
                // 다음 커서로 넘기기
                // console.log(e.currentTarget);
                const focussableElements = 'a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
                const domList = document.querySelectorAll(focussableElements);
                for(let i=0; i<domList.length;i++) {
                    if(domList[i].isSameNode(e.currentTarget)) {
                        domList[i+1].focus();
                        break;
                    }
                }
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