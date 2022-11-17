import { Button } from 'antd';
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
    border: 0;
    padding: 5px 15px;
    background-color: #ff5858;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 10px;
    box-shadow: 1px 1px 6px #25252550;
    font-weight: 600;

    :hover {
        background-color: #ff5858e2;
        color: #fff;
        box-shadow: 0px 0px 0px #25252550;
    }
`;

export default function CustomButton({ children, onClick, bg, loading }) {
    return (
        <StyledButton bg={bg} loading={loading} onClick={onClick}>
            {children}
        </StyledButton>
    )
}
