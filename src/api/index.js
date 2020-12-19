import axios from "axios";
import _ from "lodash";
import store from "store";

import { showToast } from "utils"
import { getErrorMessage } from "./message"

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, //'/api', // api 서버와 react 서버가 다를 경우 여기서 설정 가능.
    timeout: 5 * 1000, // 기본 타임아웃 5초
});

// 응답 받고 나서 중간에서 처리해서 리턴해준다.
instance.interceptors.response.use(
    function (res) {
        if (res.data.success != true) {
            // 응답에 success 값이 true가 아니면 실패처리.
            showToast(getErrorMessage(res.data.message), "red");

            // 서버에서 계정 관련한 에러메세지 내려보냈을 때 로그인으로 이동
            switch(res.data.message) {
                case "AUTH_REQURED":
                case "AUTH_WRONG":
                // JWT verify 검증 실패
                case "TokenExpiredError":
                case "JsonWebTokenError":
                case "NotBeforeError":
                    console.log("api is required login")
                    // TODO: store.dispatch로 로그인 튕겨버리고, reducer 적용해서 해당 dispatch 감지하여 로그아웃 처리바람.
                    break;
                default:
            }
            
            return Promise.reject(res);
        }

        // 응답에서 resultData 안에 담겨있는 것만 보내고, 없으면 빈 객체를 보낸다.
        return _.get(res, "data.resultData", {});
    },
    function (error) {
        showToast(getErrorMessage("SERVER_ERROR"), "red");
        return Promise.reject(error);
    }
);

/**
 * api 요청하는 함수
 * @param {object} options api 요청을 위한 옵션들
 * @param {string} options.url url
 * @param {string} options.method http method
 * @param {object} options.data 전송할 데이터
 * // TODO: 주석 다시달기
 */
const query = ({ url, method = "get", data }) => {
    if (!url) {
        console.log("url이 비어있는 axios 요청.");
        return Promise.reject(false);
    }

    let sendDataName = method.toLowerCase() == "get" ? "params" : "data";

    let headers = {};
    let user = store.get('user');
    if(!!user && !!user.token && !!user.key) {
        headers = {
            Authorization: "Token " + user.token,
        }
    }

    return instance({
        url,
        method,
        [sendDataName]: data,
        headers,
    });
};

export default query;
export { getErrorMessage };
