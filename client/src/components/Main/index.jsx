import React, { useContext } from 'react'
import styled from 'styled-components'
import ImageContextProvider from '../../context/imageContext';
import { AuthContext } from '../../context/authContext'
import Navbar from './Navbar'
import ImageComponent from './ImageComponent';

const MainContainer = styled.div`
    padding: 10px 50px;
    padding-top: 63px;
`;

export default function Main() {
    const { userDetails, logout } = useContext(AuthContext);

    console.log("userDetails", userDetails)

    return (
        <ImageContextProvider userDetails={userDetails} logout={logout}>
            <MainContainer>
                <Navbar />
                <ImageComponent />
            </MainContainer>
        </ImageContextProvider>
    )
}
