import { Dropdown, Menu, Typography } from 'antd'
import React from 'react'
import {NotificationOutlined, DownOutlined } from '@ant-design/icons'

const Notofications = () => {
  return (
    <Dropdown 
            placement="bottomRight" 
            trigger={["click"]} 
            arrow 
            overlay={ 
                <Menu style={{}}> 
                    <Menu.Item key={1} style={{ cursor: "default" }}> 
                        No Notification 
                    </Menu.Item> 
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