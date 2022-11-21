import { Card, Avatar, Row, Col, Button, Modal, Form, Input, Switch, InputNumber, message } from "antd";
import Meta from "antd/lib/card/Meta";
import form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { title } from "process";
import React, { useEffect, useState } from "react";
import TurfCards from "../../components/Turfs/TurfCards";

const HomePage = () => {
  const [createTurf, setCreateTurf] = useState(false);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false)
  const [turfs, setTurfs] = useState([]);

  const [form] = useForm();

  //axios request to get grounds
  useEffect(() => {
  axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/grounds`,
    headers: {
      "Content-Type": "application/json",
      'x-access-token': localStorage.getItem('token'),
    },
  }
  )
  .then((res) =>setTurfs(res.data))
    .catch(function (error) {
      message.error(error.message)
    })
  }, [])

  const addTurf =  async (values: any) => {
    setLoading(true)
    const { title, description, rate, active } = values

    const formData: any = new FormData()
    formData.append('gName', title)
    formData.append('description', description)
    formData.append('rate', rate)
    formData.append('active', active)

    const url = `${process.env.REACT_APP_API_URL}/grounds/create`

    axios({
        method: 'post',
        url,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            'x-access-token': localStorage.getItem('token'),
        }
    })
        .then(function () {
            setLoading(false)
            form.resetFields()
            setCreateTurf(false)
            message.success("successfully created turf")
            window.location.reload()
            
        }
        )
        .catch(function (error) {
            setLoading(false)
            message.error(error.message)
        }
        )
        window.location.reload()
  }
  // const turfs = [
  //   {
  //     id: 1,
  //     title: "Turf 1",
  //     description: "Maafannu Turf Dhandu",
  //   },
  //   {
  //     id: 2,
  //     title: "Turf 2",
  //     description: "Henveyru Turf Dhandu",
  //   },
  //   {
  //     id: 3,
  //     title: "Turf 3",
  //     description: "Galolhu Turf Dhandu",
  //   },
  //   {
  //     id: 4,
  //     title: "Turf 4",
  //     description: "Maafannu Turf Dhandu 2",
  //   },
  //   {
  //     id: 4,
  //     title: "Turf 4",
  //     description: "Maafannu Turf Dhandu 2",
  //   },
  // ];
  const role = localStorage.getItem("role");
  
  

    return (
      <>
      { role === "admin" ?
  
  (
    <div
      style={{
        maxWidth: "1200px",
        padding: "5px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "86vh",
      }}
    >
      <Button shape="round" onClick={() => setCreateTurf(true)}>Create</Button>
      <Row
        gutter={20}
        style={{
          margin: "0 auto",
        }}
      >
        
        {turfs.map((turf: any) => (
          <Col span={6} style={{ marginTop: 20 }}>
            <TurfCards
              id={turf._id}
              title={turf.gName}
              description={turf.description}
              rate={turf.rate}

            />
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <div
      style={{
        maxWidth: "1200px",
        padding: "5px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "86vh",
      }}
    >
      <Row
        gutter={20}
        style={{
          margin: "0 auto",
        }}
      >
        {turfs.map((turf: any) => (
          <Col span={6} style={{ marginTop: 20 }}>
            <TurfCards
              id={turf._id}
              title={turf.gName}
              description={turf.description}
              rate={turf.rate}
            />
          </Col>
        ))}
      </Row>
    </div>

  )}

<Modal
          title="Create Turf"
          footer={false}
          onCancel={() => {
            form.resetFields();
            setActive(true);
            setCreateTurf(false);
          }}
          visible={createTurf}
        >
          <Form
            form={form}
            onFinish={addTurf}
            layout="vertical"
            initialValues={{
              active: true,
            }}
          >
            <Form.Item label="Turf Name" name="title">
              <Input placeholder="Enter Turf Name" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input placeholder="Enter description" />
            </Form.Item>
            <Form.Item label="Rate" name="rate">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Active Status" name="active">
              <Switch
                size="small"
                checked={active}
                onChange={() => setActive(!active)}
              />
            </Form.Item>
            <Row justify="end" style={{ justifyContent: "flex-end" }}>
              <Col>
                <Button
                onClick={() => {
                  form.resetFields();
                  setActive(true);
                  setCreateTurf(false);
                }}
                
                  type="primary"
                  style={{
                    margin: "0 5px",
                    borderRadius: "20px",
                    
                  }}
                  danger
                  ghost
                >
                  Cancel
                </Button>
                <Button
                htmlType="submit"
                  style={{
                    margin: "0 5px",
                    borderRadius: "20px",
                  }}
                  type="default"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
  </>
  );

};

export default HomePage;
