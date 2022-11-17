import { Card, Avatar, Row, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import TurfCards from "../../components/Turfs/TurfCards";

const HomePage = () => {
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
            <TurfCards
              id={turf.id}
              title={turf.title}
              description={turf.description}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
