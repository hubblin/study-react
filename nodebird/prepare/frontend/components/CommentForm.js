import {Button, Form, Input} from 'antd';
import React, {useCallback} from 'react';
import useInput from '../hooks/useinput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({post}) => {
    //개시글이 있으면 그 아래에 댓글을 달거기 때문에 
    const id = useSelector((state) => state.user.me?.id);
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText])
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    )
}
CommentForm.propTypes = {
    post : PropTypes.object.isRequired,
}

export default CommentForm;