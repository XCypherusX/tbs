import { Row, Form, Input, Col, Checkbox, Button, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

const CheckboxGroup = Checkbox.Group;

const RegisterPage = () => {
  const navigation = useNavigate()
  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const genderOptions = ["Male", "Female"];

  const handleRegistration = async (values: any) => {
    setLoading(true)
    const { fullname, nid, dob, gender, contact,email, password } = values
    // console.log(firstName)
    // console.log(secondName)
    // console.log(email)
    // console.log(password)
    const formData: any = new FormData()
    formData.append('full_name', fullname)
    formData.append('nid', nid)
    formData.append('dob', dob)
    formData.append('gender', gender)
    formData.append('contact', contact)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('role', 'normal')
    const url = `${process.env.REACT_APP_API_URL}/register`

    axios({
        method: 'post',
        url,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(function () {
            setLoading(false)
            form.resetFields()
            navigation('/login')
            message.success("successfully registered user")
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
        <Form 
        form={form}
        id='registerForm'
        onFinish={handleRegistration}
        layout="vertical">
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="fullname" name="fullname">
                <Input placeholder="Enter full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="NID" name="nid">
                <Input placeholder="Enter NID no" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="DOB" name="dob">
                <Input type="date" placeholder="Enter date of birth" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gender" name="gender">
                <CheckboxGroup options={genderOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Contact No" name="contact">
                <Input type="number" placeholder="Enter contact number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Password" name="password">
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
                htmlType="submit"
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
