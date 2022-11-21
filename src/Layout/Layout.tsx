import { Col, Layout, Row } from "antd";
import React from "react";
import NavUser from "../components/NavBar/NavUser";
import Notofications from "../components/NavBar/Notofications";

const DefaultLayout = ({ children }: any) => {
  const { Header, Content } = Layout;
  const user = {
    fullName: "Hussain Shimax",
    role: "Admin",
  };
  return (
    <Layout>
      <Header style={{ background: "rgb(51, 139, 147)" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <NavUser />
          </Col>
          <Col>
            <Notofications />
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          height: "86vh",
          width: "100%",
          //   background: "gray",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
