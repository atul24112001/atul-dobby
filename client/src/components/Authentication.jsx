import styled from 'styled-components'
import { Button, Modal, Tabs } from 'antd';
import { useContext, useState } from 'react';
import CustomInput from './helper/CustomInput';
import { AuthContext } from '../context/authContext';

const CustomTabs = styled(Tabs)`
  .ant-tabs-nav {
    width: 100% !important;
  }

  .ant-tabs-tab {
    display: block; 
    flex: 1;
    text-align: center;
  }

  .ant-tabs-nav > div:nth-of-type(1) {
    display: unset !important;
    width: 100% !important;
  }
`;

export default function Authentication() {
    const { isAuthenticated, loading, logIn, singUp } = useContext(AuthContext);
    const [currentTab, setCurrentTab] = useState("1");
    const [details, setDetails] = useState({});

    const inputChangeHandler = (e) => {
        setDetails(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = async () => {
        console.log("currentTab", currentTab)
        if (currentTab === "1") {
            await logIn(details["emailId"], details["password"])
        } else {
            await singUp(details["name"], details["emailId"], details["password"])
        }
        setDetails({})
    }
    return (
        <div>
            <Modal
                open={!isAuthenticated}
                footer={
                    <Button key="submit" type="primary" loading={loading} onClick={submitHandler}>
                        {currentTab === "1" ? "LogIn" : "SingUp"}
                    </Button>
                }
            >
                <CustomTabs defaultActiveKey="1" onChange={setCurrentTab}>
                    <CustomTabs.TabPane tab="LogIn" key="1">
                        <CustomInput value={details} name="emailId" label="Email Address" placeholder="Enter email" onChange={inputChangeHandler} />
                        <CustomInput value={details} name="password" label="Password" placeholder="Enter Password" onChange={inputChangeHandler} />
                    </CustomTabs.TabPane>
                    <CustomTabs.TabPane tab="Singup" key="2">
                        <CustomInput value={details} name="name" label="Name" placeholder="Enter Name" onChange={inputChangeHandler} />
                        <CustomInput value={details} name="emailId" label="Email Address" placeholder="Enter email" onChange={inputChangeHandler} />
                        <CustomInput value={details} name="password" label="Password" placeholder="Enter Password" onChange={inputChangeHandler} />
                    </CustomTabs.TabPane>
                </CustomTabs>
            </Modal>
        </div>
    )
}
