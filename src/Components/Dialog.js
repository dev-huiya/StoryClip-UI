import React, {useState, useEffect} from 'react';
import Button from "./Button";
import PropTypes from "prop-types";

function Dialog(
    {
        dialogButton,
        callbackFunc,
        onOpen,
        width,
        height,
        disabled,
        title,
        body,
        submit
    }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(open !== true ? false : onOpen);    // 인수로 받은 것
    })

    const handleClickOpen = () => {
        setOpen(true)
        if (callbackFunc) {
            callbackFunc()
        }
    }

    const handleClickClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <div>
                {dialogButton && (
                    typeof dialogButton === "string" ?
                        <Button
                            label={dialogButton}
                            onClick={handleClickOpen}
                            disabled={disabled}
                            color="blue-gradient"
                            type="button"
                        /> :
                        typeof dialogButton === "object" ?
                            <div
                                onClick={handleClickOpen}>
                                {dialogButton}
                            </div>
                            :
                            null
                )}
            </div>
            {
                open ?
                    <React.Fragment>
                        <div className="dialog-overlay">
                            <div className="dialog" style={{width: width, height: height}}>
                                <div className="dialog-title">
                                    <div>{title}</div>
                                    <div>
                                        <button onClick={handleClickClose}>X</button>
                                    </div>
                                </div>

                                <div className="dialog-body">
                                    {body}
                                </div>

                                {submit && (
                                    <div className="dialog-submit">
                                        {submit}
                                    </div>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                    : null
            }
        </React.Fragment>
    )

}

Dialog.propTypes = {
    onClick: PropTypes.func,
    callbackFunc: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}

Dialog.defaultProps = {
    title: "",
    width: "100%",
    height: "100%",
    open: false,
    disabled: false,
}

export default Dialog;