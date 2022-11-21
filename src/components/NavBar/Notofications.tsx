import { Dropdown, Menu, Typography } from 'antd'
import React, { useEffect } from 'react'
import { NotificationOutlined, DownOutlined } from '@ant-design/icons'
import axios from 'axios'

const Notofications = () => {
    const [notifications, setNotifications] = React.useState([])

    useEffect(() => {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/wishlist/available`,
            data: {
                user_id: localStorage.getItem("user_id"),
                isAvailable: true,
            },
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((res) => setNotifications(res.data))
            .catch(err => {
                console.log(err);
            })



    }, [])
    return (
        <Dropdown
            placement="bottomRight"
            trigger={["click"]}
            arrow
            overlay={
                <Menu style={{}}>
                    <>
                    {
                        notifications.map((notification: any) => {
                    
                        <Menu.Item key={1} style={{ cursor: "default" }}>
                            {notification.ground_id.gName} is available for reservation
                        </Menu.Item>
                        })
                    }
                    </>
                    <Menu.Divider />
                </Menu>

            }
        >
            <div
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                }}
            >
                <NotificationOutlined style={{ fontSize: 16, color: "#fff" }} />
                <Typography.Text style={{ marginRight: 5, marginLeft: 10, color: 'white' }}>Notifications</Typography.Text>
                <DownOutlined style={{ fontSize: 10, color: "#fff" }} />

            </div>

        </Dropdown>
    )
}

export default Notofications