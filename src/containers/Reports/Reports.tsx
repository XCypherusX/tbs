import { Row, Table } from 'antd';
import axios from 'axios';
import { count } from 'console';
import React, { useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';

const Reports = () => {
    const [reservations, setReservations] = React.useState([]);
    useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/reservation`,
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((res) => setReservations(res.data))
            .catch(err => {
                console.log(err);
            })

    }, [])

    const data = [
        { name: 'Maafannu Stadium', value: 2 },
        { name: 'MachanGoalhi Stadium', value: 5 },
        { name: 'Henveiru Stadium', value: 1 },
        { name: 'Galolhu Stadium', value: 2 },
    ];
    const dataSource = [
        {
            key: '1',
            user: 'Mike',
            reserveTime: '2022-21-21',
        },
        {
            key: '2',
            user: 'Mike',
            reserveTime: '2022-21-21',
        },
    ];

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Time',
            dataIndex: 'reserveTime',
            key: 'reserveTime',
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
        >   <Row style={{ height: 200 }}>
                <div id="scrollableDiv"
                >
                    <Table title={() => 'Todays Reservations'} pagination={false} dataSource={dataSource} columns={columns} />
                </div>
                <div style={{ width: 300, height: 300 }}>

                            <h3 style={{ color: "white" }}>Number of reservations for today</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart >
                                <Pie dataKey="value" nameKey="name" data={data}  fill="#8884d8" label/>
                            </PieChart>
                    </ResponsiveContainer>

                </div>
            </Row>
        </div>
    )
}

export default Reports
