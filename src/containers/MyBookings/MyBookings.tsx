import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, Popconfirm, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import TurfCards from "../../components/Turfs/TurfCards";

const MyBookings = () => {
  const turfs = [
    {
      id: 1,
      title: "Turf 1",
      description: "Maafannu Turf Dhandu",
    },
    {
      id: 2,
      title: "Turf 2",
      description: "Henveyru Turf Dhandu",
    },
    {
      id: 3,
      title: "Turf 3",
      description: "Galolhu Turf Dhandu",
    },
    {
      id: 4,
      title: "Turf 4",
      description: "Maafannu Turf Dhandu 2",
    },
    {
      id: 4,
      title: "Turf 4",
      description: "Maafannu Turf Dhandu 2",
    },
  ];

  return (
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
            <Card
              style={{ height: "100%" }}
              key={turf.id}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={turf.title}
                description={turf.description}
              />
              <Popconfirm
                title="Are you sure you want to cancel？"
                okText="Yes"
                cancelText="No"
              >
                <Button danger ghost shape="round" style={{ marginTop: 10 }}>
                  <DeleteOutlined />
                  Cancel Booking
                </Button>
              </Popconfirm>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyBookings;
