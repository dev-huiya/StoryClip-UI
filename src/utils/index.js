import Toastify from 'toastify-js'

export { default as reducer } from "./reducer";

/**
 * 
 * @param {string} text 알림에 보여줄 텍스트
 * @param {number} duration 알림이 떠 있는 시간
 * @param {object} options 그외 기본값을 덮어쓸 옵션들
 */
export const showToast = (text, color = "black", duration = 3000, options = {}) => {
    const _this = Toastify({
        text: text,
        duration: duration, 
        newWindow: true,
        className: "info" + (!!color ? " "+color : ""),
        // close: true,
        gravity: "top", //"bottom", 
        position: "center", //"left", 
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function(e) {
            _this.hideToast();
        }, // Callback after click
        ...options,
      }).showToast();
    return _this;
}