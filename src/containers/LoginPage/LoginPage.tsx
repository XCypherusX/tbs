import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ login }: { login: (num: boolean) => void }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "black",
          padding: "2em",
          borderRadius: "20px",
        }}
      >
        <Row justify="center">
          <h3>
            Login/<Link to="/register">Register</Link>
          </h3>
        </Row>
        <Form layout="vertical">
          <Form.Item label="ID">
            <Input placeholder="id" />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password placeholder="input password" />
          </Form.Item>
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                onClick={() => login(true)}
                style={{ borderRadius: "20px" }}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
