import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ImageContext = React.createContext({
    images: [],
    addImage: (imageName, url) => { },
    uploading: false,
    featching: false,
    filter: "",
    setFilter: () => { }
})

const ImageContextProvider = ({ children, userDetails, logout }) => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [featching, setFeatching] = useState(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        (async () => {
            if (userDetails && userDetails["userId"]) {
                setFeatching(true)
                try {
                    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/images/${userDetails["userId"]}`, {
                        headers: {
                            'Authorization': `Bearer+${userDetails["token"]}`
                        }
                    });
                    setImages(data.data)
                } catch (error) {
                    console.log(error);
                    if (error.response.data.message === "jwt") {
                        message.error("Session expired")
                        logout()
                    } else {
                        message.error(error.response.data.message);
                    }
                }
                setFeatching(false)
            }
        })()
    }, [userDetails, logout])

    const addImage = async (imageName, url) => {
        if (imageName && url && userDetails["userId"]) {
            setUploading(true)
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/images`, { imageName, userId: userDetails["userId"], url }, {
                    headers: {
                        'Authorization': `Bearer+${userDetails["token"]}`
                    }
                });
                message.success(data.message);
                setImages(prev => [...prev, data.data])
            } catch (error) {
                console.log(error);
                message.error(error.response.data.message);
            }
            setUploading(false)
        }
    }

    return (
        <ImageContext.Provider value={{
            images,
            addImage,
            uploading,
            featching,
            filter,
            setFilter
        }}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider;