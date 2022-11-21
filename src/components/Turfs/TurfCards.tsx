import { HeartOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Radio,
  Rate,
  Row,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { time } from "console";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";

const TurfCards = ({
  id,
  title,
  description,
  rate,
}: {
  id: number;
  title: string;
  description: string;
  rate: number;
}) => {
  const user = {
    role: localStorage.getItem("role"),
  };
  
  const [status, setStatus] = useState(true);
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/reservation`,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => setReservations(res.data))
      .catch(function (error) {
        message.error(error.message);
      });


    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/timeslots`,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => setTimeSlots(res.data))
      .catch(function (error) {
        message.error(error.message);
      }
      );

  }, [])

  const createReservation = async (values: any) => {
    const { timeSlot_id} = values;
    const formData: any = new FormData();
    formData.append("timeSlot_id", timeSlot_id);
    formData.append("ground_id", localStorage.getItem('ground_id'));
    formData.append("user_id", localStorage.getItem('user_id'));
    formData.append("isActive", true)

    const url = `${process.env.REACT_APP_API_URL}/reservation/create`;

    axios({
      method: "post",
      url,
      data: formData,
        
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(function () {
        message.success("successfully created reservation");
        window.location.reload();
      }
      )
      .catch(function (error) {
        message.error(error.message);
      }
      );
  }

  const visibleHandler = () => {
    setVisible(true);
   localStorage.setItem("ground_id", id.toString());
  
  };

  const addWishlist = async (values: any) => {
    const { _id } = values;
    const formData: any = new FormData();
    formData.append("ground_id", localStorage.getItem('ground_id'));
    formData.append("user_id", localStorage.getItem('user_id'));
    formData.append("reservation_id", _id);

    const url = `${process.env.REACT_APP_API_URL}/wishlist/create`;

    axios({
      method: "post",
      url,
      data: formData,
        
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(function () {
        message.success("successfully added to wishlist");
        window.location.reload();
      }
      )
      .catch(function (error) {
        message.error(error.message);
      }
      );
  }

  const handleUpdate = async (values: any) => {
    //axios request to update ground
    const { id, title, description, rate, active } = values
    const formData = new FormData()
    formData.append('_id', id)
    formData.append('gName', title)
    formData.append('description', description)
    formData.append('rate', rate)
    formData.append('active', active)

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/grounds/update`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then(function () {
      form.resetFields()
      setVisible(false)
      message.success("Successfully updated turf")
  }
  )
  .catch(function (error) {
      message.error(error.message)
  }
  )

    window.location.reload()
    setVisible(false);
  };

  

  const handleDelete = async (values: any) => {
    //axios request to delete ground
    const { id } = values
    const formData = new FormData()
    formData.append('_id', id)

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/grounds/delete`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then(function () {
      form.resetFields()
      message.success("Successfully deleted turf")
      window.location.reload()
  }
  )
  .catch(function (error) {

      message.error(error.message)
  }
  )
}



  const checkId = (id1: any, id2: any) => {
    if (id1 === id2) {
      return true;
    } else {
      return false;
    }
  };

  //check if a time slot is available for reservation
  const checkAvailability = (timeSlot_id: any) => {
    var available = true;
    reservations.map((reservation: any) => {
      if (checkId(timeSlot_id, reservation.timeSlot_id)) {
        available = false;
      }
    });
    return available;
  };




  return (
    <>
      <Card
        onClick={visibleHandler}
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
        <p>{rate}</p>
      </Card>
      {user.role === "admin" ? (
        <Modal
          title="Edit Turf details"
          footer={false}
          onCancel={() => {
            form.resetFields();
            setStatus(true);
            setVisible(false);
            localStorage.removeItem("ground_id");
          }}
          visible={visible}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              id: id,
              title: title,
              description: description,
              rate: rate,
              active: true,
            }}
            onFinish={handleUpdate}
          >
            <Form.Item  label="ID" name="id">
              <Input disabled placeholder="Enter title" />
            </Form.Item>
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input placeholder="Enter description" />
            </Form.Item>
            <Form.Item label="Rate" name="rate">
              <InputNumber placeholder="Enter description" />
            </Form.Item>
            <Form.Item label="Active Status" name="active">
              <Switch
                size="small"
                checked={status}
                onChange={() => setStatus(!status)}
              />
            </Form.Item>
            <Row justify="end" style={{ justifyContent: "flex-end" }}>
              <Col>
              <Popconfirm
                        title={`Are you sure to remove this turf?`}
                        onConfirm={() => handleDelete({id})}
                        okText="Confirm"
                        cancelText="No"
                        placement="topRight"
                    >
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
                </Popconfirm>
                <Button
                htmlType="submit"
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
            
         
            <Form
            form={form}
            onFinish={createReservation}
            layout="vertical"
            initialValues={{
              active: true,
            }}
          >
            <Row>
              <Col span={22}>
           <Form.Item name="timeSlot_id">
         <Radio.Group style={{ width: '100%' }}>
          { timeSlots.map((timeSlot:any) => (

          <Radio.Button
          key={timeSlot._id}
          // disabled={checkAvailability(timeSlot._id)}
           
              style={{
              background:
                "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))",
              padding: "5px",
              borderRadius: "20px",
              margin: "7px 0",
              textAlign: "center",
              width: "100%",
            }} value={timeSlot._id}>{moment(timeSlot.begTime ).utcOffset('+0000').format('HH:mm A')} - {moment(timeSlot.endTime).utcOffset('+0000').format('HH:mm A')}
            
            </Radio.Button>

            
            ))}
        </Radio.Group>
            
            </Form.Item>
            </Col>
            <Col span={2}>
            
            {
              timeSlots.map((timeSlot:any) => (
                <>
                {
              disabled === true ? 
              (
                <Tooltip title="Time slot is not available, add to wish list to get notified once its availiable">
              <Popconfirm title="Are you sure you want to add to wish?">
              <Button 
              shape="circle" style={{
                padding: "5px",
                borderRadius: "20px",
                margin: "7px 0",
                textAlign: "center",
              }}>
              <HeartOutlined />
              </Button>
              </Popconfirm>
              </Tooltip>
              )
              : 
              (
                <Tooltip title="Time slot is available, cannot add to wishlist">
              <Button disabled shape="circle" style={{
                padding: "5px",
                borderRadius: "20px",
                margin: "7px 0",
                textAlign: "center",
              }}>
              <HeartOutlined />
              </Button>
              </Tooltip>
              )
            }
            </>
            ))}
           </Col>
            
            </Row>
        <Row justify="end" style={{ marginTop: "15px" }}>
            <Col>
              <Button htmlType="submit" type="default" style={{ borderRadius: "20px" }}>
                Confirm
              </Button>
            </Col>
          </Row>
        </Form>
        </Modal>
      )}
    </>
  );
};

export default TurfCards;