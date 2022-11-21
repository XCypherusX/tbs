import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, message, Popconfirm, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import TurfCards from "../../components/Turfs/TurfCards";
import axios from "axios";

const MyBookings = () => {
  const [reservation, setReservation] = useState([]);
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


  useEffect(() => {

    const user_id = localStorage.getItem("user_id");
    const isActive = 1;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/reservation/byuser`,
      data: {
        user_id: user_id,
        isActive: isActive,
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) =>setReservation(res.data))
      .catch(err => {
        console.log(err);
      })



  }, []);
  console.log(reservation);
  const handleCancel = (resvalue:any, groundvalue:any) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/reservation/cancel`,
      data: {
        _id: resvalue,
        isActive: 0,
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      message.success("Reservation Cancelled");
    })
    .catch(err => {
      console.log(err);
    })

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/wishlist/availupdate`,
      data: {
        reservation_id: resvalue,
        ground_id: groundvalue,
        user_id: localStorage.getItem("user_id"),
        isAvailable: 1,
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => {console.log(res)})
    .catch(err => {
      console.log(err);
    })

  };
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
        {reservation.map((reserve: any) => (
          <Col span={6} style={{ marginTop: 20 }}>
            <Card
              style={{ height: "100%" }}
              key={reserve.id}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={reserve.ground_id.gName}
                description={reserve.ground_id.description}
              />
              <p>
              {moment(reserve.timeSlot_id.begTime ).utcOffset('+0000').format('hh:mm a')} to {moment(reserve.timeSlot_id.endTime ).utcOffset('+0000').format('hh:mm a')}
                </p>
              <Popconfirm
                title="Are you sure you want to cancel？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleCancel(reserve._id, reserve.ground_id._id)}
              >
                <Button  danger ghost shape="round" style={{ marginTop: 10 }}>
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
