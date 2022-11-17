import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ImageContext } from '../../context/imageContext';
import NoData from "../../assets/no-data.jpg"
import { EyeOutlined } from '@ant-design/icons'
import { Modal } from 'antd';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 0;
    gap: 4vw;
`;

const NoDataContainet = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const ImageContainer = styled.div`
    width: ${window.innerWidth <= 500 ? "90vw" : "20vw"};
    height: ${window.innerWidth <= 500 ? "70vh" : "30vh"};
    border-radius: 5px;
    overflow: hidden;
    position: relative;
`;

const Image = styled.img`
    width: ${window.innerWidth <= 500 ? "90vw" : "20vw"};
    height: ${window.innerWidth <= 500 ? "70vh" : "30vh"};
    object-fit: cover;
`;

const Details = styled.div`
    background: #00000020;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;

    & h4 {
        color: #fff;
    }
`;


export default function ImageComponent() {
    const { images, filter } = useContext(ImageContext);
    const [preview, setPreview] = useState(null)

    const data = useMemo(() => {
        return images.filter(image => image.imageName.toLowerCase().includes(filter.toLowerCase()));
    }, [filter, images])

    if (data.length === 0) {
        return (
            <NoDataContainet>
                <img style={{ height: window.innerWidth <= 500 ? "30vh" : "50vh" }} src={NoData} alt="No Data" />
                <div style={{ color: "#ccc", fontWeight: "bold" }}>Upload a image</div>
            </NoDataContainet>
        )
    }
    return (
        <Container>
            {data.map((image) => {
                return (
                    <ImageContainer>
                        <Image src={image.url} ali={image.imageName} />
                        <Details>
                            <h4 >{image.imageName}</h4>
                            <EyeOutlined style={{ cursor: "pointer" }} onClick={() => setPreview(image)} />
                        </Details>
                    </ImageContainer>
                )
            })}
            <Modal open={Boolean(preview)} title={preview?.imageName} footer={null} onCancel={() => setPreview(null)}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={preview?.url}
                />
            </Modal>
        </Container>
    )
}
