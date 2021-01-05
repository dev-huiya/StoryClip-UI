import React, { useCallback, useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {Image} from "../../Components";

function Header({ user, ...props }) {

    // useEffect(()=>{
    //     console.log("header",user);
    // }, [user]);

    return (
        <React.Fragment>
            <div
                className={"w-full flex justify-between items-center fixed global-header"}
            >
                <div>
                    <Link to="/" >StoryClip</Link>
                </div>
                <div className={"user-info flex items-center"}>
                    <Image
                        className={"profile"}
                        src={user.profile}
                    />
                    <span className={"penName"}>{user.penName}</span>
                </div>
            {/* TODO: POPUP 추가해서 사용자 정보 수정할수 있는 UI 추가 바람 */}
            </div>
        </React.Fragment>
    )
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
    user: state.user,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);