import PropTypes from 'prop-types';
import Link from 'next/link';
import {Input, Menu, Row, Col} from 'antd';
import React, {useState} from 'react';
import styled from 'styled-components';
//반응형을 디자인 할때는 모바일 먼저 하고 점점 키워야한다.
import {useSelector} from 'react-redux';

const SearchInput = styled(Input.Search)`
    vertical-align: middle
`;

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

const AppLayout = ({children}) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    
    return (
    <div>
        <Menu mode="horizontal">
            <Menu.Item>
                <Link href="/"><a>노드버드</a></Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/profile"><a>프로필</a></Link>
            </Menu.Item>
            <Menu.Item>
                <SearchInput enterButton/>
            </Menu.Item>
            <Menu.Item>
                <Link href="/signup"><a>회원가입</a></Link>
            </Menu.Item>
        </Menu>
        <Row gutter={8}>
            <Col xs={24} md={6}>
                {isLoggedIn ? <UserProfile/> : <LoginForm/>}
            </Col>
            <Col xs={24} md={12}>
                {children}
            </Col>
            <Col xs={24} md={6}>
                <a href="https://google.com" target="_blank" rel="noreferrrer noopper"></a>
            </Col>
        </Row>
    </div>
    )
};

AppLayout.propTypes = {
    children : PropTypes.node.isRequired,
}

export default AppLayout;