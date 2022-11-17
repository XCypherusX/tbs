import { Avatar, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const NavUser = () => {
  const user = {
    fullName: "Hussain Shimaz",
  };
  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      arrow
      overlay={
        <Menu style={{}}>
          <Menu.Item disabled key={1} style={{ cursor: "default" }}>
            {user?.fullName}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <Link to="/mybookings">My Bookings</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <LogoutOutlined /> Logout
          </Menu.Item>
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
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      </div>
    </Dropdown>
  );
};

export default NavUser;
