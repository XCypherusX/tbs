import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Switch,
  Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";

const TurfCards = ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  const user = {
    fullName: "Hussain Shimax",
    role: "Normal",
  };
  const [active, setActive] = useState(true);
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Card
        onClick={() => setVisible(true)}
        style={{ height: "100%" }}
        key={id}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta
          // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={title}
          description={description}
        />
      </Card>
      {user.role === "Admin" ? (
        <Modal
          title="Edit Turf details"
          footer={false}
          onCancel={() => {
            form.resetFields();
            setActive(true);
            setVisible(false);
          }}
          visible={visible}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              title: title,
              description: description,
              active: true,
            }}
          >
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input placeholder="Enter description" />
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
                  type="primary"
                  style={{
                    margin: "0 5px",
                    borderRadius: "20px",
                  }}
                  danger
                  ghost
                >
                  Delete
                </Button>
                <Button
                  style={{
                    margin: "0 5px",
                    borderRadius: "20px",
                  }}
                  type="default"
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      ) : (
        <Modal
          title="Avalable time slots"
          footer={false}
          onCancel={() => setVisible(false)}
          visible={visible}
        >
          <div
            style={{
              background:
                "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))",
              padding: "5px",
              borderRadius: "20px",
              margin: "7px 0",
              textAlign: "center",
            }}
          >
            <Typography.Text>1pm -{">"} 2pm</Typography.Text>
          </div>
          <div
            style={{
              padding: "5px",
              borderRadius: "20px",
              margin: "7px 0",
              textAlign: "center",
            }}
          >
            <Typography.Text disabled>2pm -{">"} 3pm</Typography.Text>
          </div>
          <div
            style={{
              background:
                "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))",
              padding: "5px",
              borderRadius: "20px",
              margin: "7px 0",
              textAlign: "center",
            }}
          >
            <Typography.Text>3pm -{">"} 4pm</Typography.Text>
          </div>
          <Row justify="end" style={{ marginTop: "15px" }}>
            <Col>
              <Button type="default" style={{ borderRadius: "20px" }}>
                Confirm
              </Button>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default TurfCards;
