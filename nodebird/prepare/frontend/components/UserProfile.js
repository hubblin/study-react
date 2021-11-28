import {Card, Avatar, Button} from 'antd';
import React, {useCallback} from 'react';
import { useDispatch } from 'react-redux';

import {logoutAction} from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch();
    const onLogout = useCallback(()=>{
        dispatch(logoutAction());
    },[])

    return(
        <Card
            actions={[
                <div key='twit'>짹짹<br/>0</div>,
                <div key="following">짹짹<br/>0</div>,
                <div key="followings">짹짹<br/>0</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>LM</Avatar>}
                title="hokyun"
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;