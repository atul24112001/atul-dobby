import { message, Modal } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { ImageContext } from '../../context/imageContext';
import CustomButton from '../helper/CustomButton';
import CustomInput from '../helper/CustomInput';
import { LinkOutlined, DeleteOutlined } from "@ant-design/icons"
import { AuthContext } from '../../context/authContext';
// import getBase64 from "image-to-base64"

const NavContainer = styled.div`
    box-shadow: 1px 2px 4px #00000015;
    display: flex;
    justify-content: space-between;
    padding: ${window.innerWidth < 500 ? "10px" : "10px 50px"};
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

const Logo = styled.h2`
    font-family: Lobster;
    margin: 0;

    & span {
        color: #ff5858;
    }
`;
const SearchBox = styled.div`
    flex: 1;
    padding: 0 10px;
    display: flex;
    justify-content: center;
`;

const UploadBox = styled.div`
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    padding: 20px;
    margin: 10px 0;
    width: 100%;
    font-weight: 600;
    /* flex-direction: column;
    align-items: center; */
`;

const ImageNameBox = styled.div`
    color: #ff5858;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    font-weight: 500;
    gap: 10px;
`;

// function getBase64(file) {
//     let document = "";
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//         document = reader.result;
//     };
//     reader.onerror = function (error) {
//         console.log('Error: ', error);
//     };

//     return document;
// }

export default function Navbar() {
    const inputRef = useRef();
    const { setFilter, filter, addImage, uploading, featching } = useContext(ImageContext);
    const { logout } = useContext(AuthContext)
    const [uploadModal, setUploadModal] = useState(false);
    const [imageDetails, setImageDetails] = useState({ images: [] })

    const toggleModal = () => setUploadModal(prev => !prev);

    const changeHandler = (e) => {
        setImageDetails(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const fileUploadHandler = (e) => {
        setImageDetails(prev => ({ ...prev, images: e.target.files }))
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new window.FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.onerror = (error) => {
                message.error(error.message)
                reject(error)
            }
        })
    }

    const clear = () => {
        inputRef.current.value = ""
        setImageDetails({ images: [] })
    }

    const clickUploadHandler = async () => {
        let name = imageDetails["name"];
        if (!name) {
            message.warning("Please provide name.")
            return;
        }
        if (!imageDetails.images[0]) {
            message.warning("Please Attach Image.");
            return;
        }
        let url = await getBase64(imageDetails["images"][0]);
        await addImage(name, url)
        setUploadModal(false)
        clear()
    }

    return (
        <NavContainer>
            <Logo>Atul-<span>Gallery</span></Logo>
            <SearchBox>
                <CustomInput style={{ width: "100%" }} name="search" value={{ search: filter }} placeholder="Search..." onChange={(e) => setFilter(e.target.value || "")} />
            </SearchBox>
            <CustomButton loading={uploading} onClick={toggleModal}>
                Upload
            </CustomButton>
            <CustomButton onClick={logout} loading={featching}>
                logout
            </CustomButton>
            <Modal
                open={uploadModal}
                onCancel={toggleModal}
                footer={(
                    <div>
                        <CustomButton onClick={clickUploadHandler}>Upload Image</CustomButton>
                    </div>
                )}
            >
                <CustomInput value={imageDetails} label="Name" placeholder="Enter Image Name" name="name" onChange={changeHandler} />
                <input accept=".png, .jpg, .jpeg" type='file' style={{ display: "none" }} onChange={fileUploadHandler} ref={inputRef} />
                {imageDetails.images.length === 0 ? (
                    <UploadBox onClick={() => { inputRef.current.click() }}>Click or Drop a Image.</UploadBox>
                ) : (
                    <ImageNameBox>
                        <div style={{ flex: 1 }}>
                            {imageDetails.images[0].name}
                        </div>
                        <LinkOutlined />
                        <DeleteOutlined style={{ cursor: "pointer" }} onClick={clear} />
                    </ImageNameBox>
                )
                }
            </Modal>
        </NavContainer>
    )
}

// new FileReader().readAsDataURL