import { Button, Col, Form, Input, message, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const login = async (values: any) => {
    setLoading(true);
    const { email, password } = values;
    const formData: any = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    const url = `${process.env.REACT_APP_API_URL}/login`

    axios({
      method: 'post',
      url,
      data: formData,
      headers: {
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Origin': '*'
      }
  })
      .then(res => res)
      .then(data => {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', data.data.full_name)
        localStorage.setItem('user_id', data.data._id)
        localStorage.setItem('role', data.data.role)

        window.location.href = '/'

      })
      .catch(function (error) {
          setLoading(false)
          message.error(error.message)
      })
  }

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
        <Form layout="vertical" form={form} onFinish={login}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="input password" />
          </Form.Item>
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
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
