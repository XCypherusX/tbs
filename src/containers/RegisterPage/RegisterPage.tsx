import { Row, Form, Input, Col, Checkbox, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const CheckboxGroup = Checkbox.Group;

const RegisterPage = () => {
  const genderOptions = ["Male", "Female"];
  return (
    <div
      style={{
        height: "100vh",
        // width: "100vw",
        minHeight: "600px",
        // overflowY: "auto",
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
          margin: "10px",
        }}
      >
        <Row justify="center">
          <h3>Register</h3>
        </Row>
        <Row>
          <h4>Fill in the details to register</h4>
        </Row>
        <Form layout="vertical">
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Full Name">
                <Input placeholder="Enter full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="NID">
                <Input placeholder="Enter NID no" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="DOB">
                <Input type="date" placeholder="Enter date of birth" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gender">
                <CheckboxGroup options={genderOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Contact No">
                <Input type="number" placeholder="Enter contact number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input type="email" placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Password">
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input.Password placeholder="Comfirm password" />
          </Form.Item>

          <Row justify="center" gutter={12}>
            <Col>
              <Button
                type="ghost"
                // onClick={() => login(true)}
                style={{ borderRadius: "20px" }}
              >
                Back to login
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                // onClick={() => login(true)}
                style={{ borderRadius: "20px" }}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
