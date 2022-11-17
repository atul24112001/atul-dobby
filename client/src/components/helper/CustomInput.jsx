import React, { useState } from 'react'
import { Input } from "antd";
import styled from "styled-components";

const StyledInput = styled(Input)`
    border-radius: 5px;
`;

const StyledPassword = styled(Input.Password)`
    border-radius: 5px;
`;

const StyledLabel = styled.h4`
    margin-bottom: 0;
    margin-top: 10px;
`;


export default function CustomInput({ label, onChange, value, placeholder, name, style = {} }) {
    const [visibility, setVisibility] = useState(false);
    return (
        <div>
            {label && <StyledLabel>{label}</StyledLabel>}
            {name === "password" ? (
                <StyledPassword
                    style={style}
                    visibilityToggle={{
                        visible: visibility,
                        onVisibleChange: setVisibility,
                    }}
                    onChange={onChange}
                    value={value[name] || ""}
                    placeholder={placeholder}
                    name={name}
                />
            ) : (
                <StyledInput
                    style={style}
                    onChange={onChange}
                    value={value[name] || ""}
                    placeholder={placeholder}
                    name={name}
                />
            )}
        </div>
    )
}
