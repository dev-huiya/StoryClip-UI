
/**
 * 서버에서 내려온 에러 메세지를 문자열로 바꿔주는 함수.
 * @param {string} key 서버에서 내려온 에러 메세지
 */
export const getErrorMessage = (key) => {
    let message = "";
    switch(key) {
        case "AUTH_REQURED":
            message = "로그인이 필요합니다."
            break;
        case "AUTH_WRONG":
            message = "잘못된 계정 정보입니다."
            break;
        case "JOIN_DUPLICATE":
            message = "이미 사용하고 있는 이메일입니다."
            break;
        case "CAPTCHA_EMPTY":
        case "CAPTCHA_FAIL":
            message = "캡챠 인증에 실패했습니다."
            break;
        
        // JWT verify 검증 실패
        case "TokenExpiredError":
            message = "만료된 토큰입니다."
            break;
        case "JsonWebTokenError":
            message = "토큰 검증에 실패했습니다."
            break;
        case "NotBeforeError":
            message = "아직 활성화되지 않은 토큰입니다."
            break;
        
        // 서버에서 내려온 JWT 관련 오류
        case "JWT_KEY_EMPTY":
            message = "JWT 키가 없습니다."
            break;
        case "JWT_PUB_KEY_EMPTY":
            message = "JWT 공개 키가 없습니다."
            break;
        default: 
            message = "서버에서 오류가 발생했습니다."
    }
    return message;
}