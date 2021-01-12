import React, {useState, useEffect, useCallback} from 'react';
import Button from "./Button";
import PropTypes from "prop-types";

function Dialog(
    {
        trigger,
        afterOpen,
        onOpen,
        width,
        height,
        disabled,
        title,
        body,
        submit,
        ...props
    }) {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isOpen !== true ? false : onOpen);    // 인수로 받은 것
    })

    const handleClickOpen = useCallback(() => {
        setOpen(true)
        if (afterOpen instanceof Function) {
            afterOpen()
        }
    }, [])

    const handleClickClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <React.Fragment>
            <div>
                {trigger && (
                    typeof trigger === "string" ?
                        <Button
                            label={trigger}
                            onClick={handleClickOpen}
                            disabled={disabled}
                            color="blue-gradient"
                            type="button"
                        /> :
                        typeof trigger === "object" ?
                            <div
                                onClick={handleClickOpen}
                            >{trigger}</div>
                            :
                            null
                )}
            </div>
            {
                isOpen ?
                    <React.Fragment>
                        <div className="_dialog-overlay" onClick={handleClickClose}>
                            <div
                                className="_dialog"
                                style={{width: width, height: height}}
                                onClick={(e)=> { e.stopPropagation() }}
                            >
                                {title && (
                                    <div className="_dialog-title">
                                        <div>{title}</div>
                                        <div>
                                            <button onClick={handleClickClose}>X</button>
                                        </div>
                                    </div>
                                )}


                                <div className="_dialog-body">
                                    {body}
                                </div>

                                {submit && (
                                    <div className="_dialog-submit">
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
    afterOpen: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}

Dialog.defaultProps = {
    title: "",
    width: "800px",
    height: "500px",
    open: false,
    disabled: false,
}

export default Dialog;