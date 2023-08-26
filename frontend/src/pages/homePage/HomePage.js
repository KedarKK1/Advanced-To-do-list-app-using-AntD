import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import FetchData from '../../components/FetchData';
import { Layout, Typography, Row, Col, Input, Select, Tag, Table, Button, Modal, Form, } from 'antd';
import { DatePicker, Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import { Link } from 'react-router-dom';
// var moment = require('moment');
const { Title } = Typography;

const HomePage = (props) => {
    const [todoMessage, setTodoMessage] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [todoTags, setTodoTags] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isChecked, setIsChecked] = useState('OPEN');
    // const [setDafaultDate, setSetDafaultDate] = useState(null);
    const [setDafaultDate] = useState(null);
    const [getData, setGetData] = useState('')
    const [tobeDeleted, setTobeDeleted] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const inputRef = useRef(null);
    const descriptionRef = useRef(null);


    const handleChange = (e) => {
        // console.log(e.target.value);
        setTodoMessage(e.target.value);
    }

    // const handleChange2 = (e) => {
    //   let value2 = e.target.value;
    //   setBirthDate(value2);
    // }

    const handleChange2 = (e) => {
        // console.log(e.target.value);
        setTodoTags(e.target.value);
    }

    const handleChange3 = (e) => {
        // console.log(e.target.value);
        setTodoDescription(e.target.value);
    }

    const onDateChange = (date, dateString) => {
        // console.log(date, dateString);
        // console.log(date.target.value);
        setBirthDate(dateString);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(todoMessage);


        const entry = new Map([
            ['title', todoMessage],
            ['description', todoDescription],
            ['birthdayDate', birthDate],
            ['complete', isChecked],
            ['tag', todoTags],
        ])
        const obj = Object.fromEntries(entry);
        // console.log(obj);
        e.preventDefault();
        // console.log(typeof(obj))

        var url = 'http://127.0.0.1:8000/task-create/'
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then(response => {
            <FetchData />
            window.location.reload();
        })
    }

    const showModal = (e) => {
        setTobeDeleted(e);
        // console.log(tobeDeleted);
        setIsModalVisible(true);
    };

    const handleOk = (e) => {
        // console.log(e)
        var url = `http://127.0.0.1:8000/task-delete/${e}/`
        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            window.location.reload();
        })
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
            // render: (text) => <a>{text}</a>,
            render: (text) => <>{text}</>,
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.Title.localeCompare(b.Title),
        },
        {
            title: 'DueDate',
            dataIndex: 'duedate',
            key: 'duedate',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
            sorter: (a, b) => new Date(a.duedate).getTime() - new Date(b.duedate).getTime(),
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'OPEN',
                    value: 'OPEN',
                },
                {
                    text: 'WORKING',
                    value: 'WORKING',
                },
                {
                    text: 'DONE',
                    value: 'DONE',
                },
                {
                    text: 'OVERDUE',
                    value: 'OVERDUE',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,

        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.Description.localeCompare(b.Description),

        },
        {
            title: "Date(created)",
            dataIndex: 'date',
            key: 'date',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => (a.date).unix() - (b.date).unix()
            sorter: (a, b) => new Date(a.duedate).getTime() - new Date(b.duedate).getTime(),
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 6 ? 'geekblue' : 'green';
                        // let color = tag.length > 5 ? 'geekblue' : 'green';

                        if (tag === 'loser') {
                            color = 'volcano';
                        }

                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                                {/* {tag.toUpperCase()} */}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            // render: (_, record) => (
            //     <Space size="middle">
            //         {/* <a>Status: {record.status}</a> */}
            //         <a>Edit {record.Edit}</a>
            //         <Button danger onClick={showModal} >Delete</Button>
            //         <Modal title="Delete" visible={isModalVisible} onOk={(e)=>{handleOk(e)}} onCancel={handleCancel} okText="Delete" okType="danger" cancelText="Cancel">
            //             <p>Are You Sure you want to delete this record?</p>
            //         </Modal>
            //     </Space>
            // ),
        },
    ];

    // const getIt = new Array();
    const getIt = [];

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/task-list/')
            .then(res => {
                setIsLoading(true);
                setGetData(res.data)
                // let v = res.data
                // console.log(res.data)
                // function storeItToArray(v) {
                //     v.getData.forEach((item,index)=>{
                //         getIt.push(
                //             {key: index,
                //             Title: item.title,
                //             duedate: <DatePicker defaultValue={moment(item.birthdayDate)} />,
                //             date: <DatePicker defaultValue={moment(item.created_at)} disabled />,
                //             Description: item.description,
                //             tags:item.tag, 
                //         },
                //         )
                //     })
                // }
                // storeItToArray(v);
                // {getData.forEach((item,index)=>{
                //     getIt.push(
                //         {key: {index},
                //         Title: item.title,
                //         duedate: <DatePicker defaultValue={moment(item.birthdayDate)} />,
                //         date: <DatePicker defaultValue={moment(item.created_at)} disabled />,
                //         Description: item.description,
                //         tags:item.tag, 
                //     },
                //     )
                // })}
                setIsLoading(false);
            })
            .catch(err => {
                console.log("error caught", err)
            })

    }, [])

    // const tags2 = new Array(getData[i].tag.split(','))
    // console.log(tags2)
    for (let i = 0; i < getData.length; i++) {
        getIt.push(
            {
                index: i + 1,
                key: `${i + 1}`,
                status: getData[i].complete,
                Title: getData[i].title,
                duedate: (getData[i].birthdayDate),
                // duedate: <DatePicker defaultValue={moment(getData[i].birthdayDate)} />,
                // date: (getData[i].created_at),
                date: (getData[i].created_at),
                Description: getData[i].description,
                tags: getData[i].tag.split(','),
                action:
                    <Space size="middle">
                        {/* <a>Status: {record.status}</a> */}
                        <Link to={`/editPage/${getData[i].id}`}>Edit</Link >
                        <Button danger onClick={() => showModal(getData[i].id)} >Delete</Button>
                        <Modal title="Delete" visible={isModalVisible} onOk={() => { handleOk(tobeDeleted) }} onCancel={handleCancel} okText="Delete" okType="danger" cancelText="Cancel">
                            <p>Are You Sure you want to delete this record?</p>
                        </Modal>
                    </Space>
            },
        )

    }

    // console.log(getIt)

    const onChangeSortFilter = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
        console.log('onChangeSortFilter was called');
    };

    const [search, setSearch] = useState('');
    //   console.log(getIt)
    const [mydataSource, setmydataSource] = useState(getIt)
    const [tablefilter, setTablefilter] = useState([])

    const filterData = (e) => {
        if (e.target.value !== "") {
            // you have to include below line else it shows mydataSource as mpty array
            setmydataSource(getIt)
            setSearch(e.target.value);
            // console.log(mydataSource)
            const filterTable = mydataSource.filter(o => Object.keys(o).some(k =>
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            ))
            setTablefilter([...filterTable])
        } else {
            setSearch(e.target.value);
            setmydataSource([...mydataSource]);
        }
    }

    return (
        <Layout>
            {isLoading ? "Loading..." : (

                <Content>
                    <Form>
                        <Title underline={true} align="center">Enter your Task Here</Title>
                        <Row style={{ paddingTop: '5px' }} >
                            <Col xxl={2} xl={2} lg={2} md={2} sm={0} xs={0} />
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={8} xl={8} lg={8} md={8} sm={16} xs={16} >
                                <Form.Item label="Title" name="Title" rules={[{ required: true, message: 'Please Enter Title' }]}>
                                    <Input showCount maxLength={100} ref={inputRef} onChange={handleChange} value={todoMessage} placeholder="Enter Task Title" />
                                </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />

                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={8} xl={8} lg={8} md={8} sm={16} xs={16} >
                                <Form.Item label="Description" name="Description" rules={[{ required: true, message: 'Please Enter Title' }]}>
                                    <TextArea showCount rows={1} maxLength={1000} ref={descriptionRef} value={todoDescription} onChange={handleChange3} placeholder="Enter Description" />
                                </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />

                            <Col xxl={2} xl={2} lg={2} md={2} sm={0} xs={0} />

                            <Col xxl={2} xl={2} lg={2} md={2} sm={0} xs={0} />

                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={4} xl={4} lg={4} md={4} sm={16} xs={16} >
                                {/* here dont use for instead use htmlFor as in react like className */}
                                {/* <label htmlFor="isComplete">Is Complete : </label>
                                        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} checked={isChecked} value={isChecked} onChange={handleChange3} /> */}
                                <Form.Item label="Status" name="Status" rules={[{ required: true, message: 'Please Select Status' }]}>
                                    <Select defaultValue={isChecked} onChange={(value) => { setIsChecked(value) }} style={{ width: "100%", }} >
                                        <Option value="OPEN">OPEN</Option>
                                        <Option value="WORKING">WORKING</Option>
                                        <Option value="DONE">DONE</Option>
                                        <Option value="OVERDUE">OVERDUE</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />

                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={4} xl={4} lg={4} md={4} sm={16} xs={16} >
                                <Form.Item label="Tags" name="Tags">
                                    <Input showCount maxLength={100} onChange={handleChange2} value={todoTags} placeholder="'play','read' " />
                                </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />

                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={4} xl={4} lg={4} md={4} sm={16} xs={16} style={{ width: '100%', }} >
                                {/* here dont use for instead use htmlFor as in react like className */}
                                {/* <label htmlFor="mybirthdaytime">Due date: </label> */}
                                {/* <input type="date" id="mybirthdaytime" onChange={handleChange2} value={birthDate} name="mybirthdaytime"/> */}
                                <Form.Item label="Due Date" name="DueDate">
                                    <Space direction="vertical">
                                        {/* do not give value="bdayValue" to this this will give an moment object */}
                                        <DatePicker label="Due date:" id="mybirthdaytime" name="mybirthdaytime" onChange={onDateChange} defaultValue={setDafaultDate} />
                                    </Space>
                                </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={2} xl={2} lg={2} md={2} sm={0} xs={0} />
                        </Row>
                        <div align="center" style={{ paddingTop: '5px' }} >
                            <Button type="primary" onClick={handleSubmit}>Submit</Button>
                        </div>

                    </Form>

                    <hr />

                    <Title align="center">Your Tasks list is : </Title>
                    <Row style={{ margin: "5px" }}>
                        <Col xxl={15} xl={15} lg={15} md={15} sm={4} xs={4} />
                        <Col xxl={9} xl={9} lg={9} md={9} sm={20} xs={20} >
                            <Input showCount maxLength={100} onChange={filterData} value={search} placeholder="🔍 Seach Queries " />
                        </Col>
                    </Row>
                    {/* <Table style={{ width: '100', overflow: 'scroll', }} columns={columns} dataSource={getIt} onChange={onChangeSortFilter}  /> */}
                    <Table style={{ width: '100', overflow: 'scroll', }} columns={columns} dataSource={
                        search.length > 0 ? tablefilter : getIt
                    } onChange={onChangeSortFilter} />

                </Content>
            )}
        </Layout>
    )
}

export default HomePage;