import { Button, Col, DatePicker, Form, Input, Layout, Row, Select, Space } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Content } from 'antd/lib/layout/layout'
// import { Option } from 'antd/lib/mentions'
import Title from 'antd/lib/skeleton/Title'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import FetchData from '../../components/FetchData'
import axios from 'axios'
import { useParams } from "react-router-dom";
var moment = require('moment');

const EditPage = () => {

    let { id } = useParams();

    // const [getData, setGetData] = useState('')
    // const [tobeDeleted, setTobeDeleted] = useState(0);
    // const [isModalVisible, setIsModalVisible ] = useState(false)
    const [todoMessage, setTodoMessage] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [todoTags, setTodoTags] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isChecked, setIsChecked] = useState('OPEN');
    const [setDafaultDate, setSetDafaultDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        // const data = await axios.get(`http://127.0.0.1:8000/task-detail/${id}/`)
        //     .then(res => {
        //         setGetData(res.data)
        //         // console.log(res.data)
        //         // setTodoMessage(res.data.title)
        //         // setTodoDescription(res.data.description)
        //         // setSetDafaultDate(res.data.birthdayDate)
        //         // setTodoTags(res.data.tag)
        //         // setIsChecked(res.data.complete)
        //         // setTodoMessage(res.data.title)
        //     })
        //     todoDescription(data.description)
            async function getMyData() {
                setIsLoading(true)
                const mydata = await axios.get(`http://127.0.0.1:8000/task-detail/${id}/`)
                // setGetData(mydata.data)
                // console.log(mydata.data.title)
                // console.log(mydata.data)
                setTodoMessage(mydata.data.title)
                setTodoDescription(mydata.data.description)
                setSetDafaultDate(moment(mydata.data.birthdayDate))
                setTodoTags(mydata.data.tag)
                setIsChecked(mydata.data.complete)
                setIsLoading(false)
            }
            getMyData()

            .catch(err => {
                console.log("error caught", err)
            })
      }, [id])


    //   useEffect(() => {
    //     // const data = await axios.get(`http://127.0.0.1:8000/task-detail/${id}/`)
    //     //     .then(res => {
    //     //         setGetData(res.data)
    //     //         // console.log(res.data)
    //     //         // setTodoMessage(res.data.title)
    //     //         // setTodoDescription(res.data.description)
    //     //         // setSetDafaultDate(res.data.birthdayDate)
    //     //         // setTodoTags(res.data.tag)
    //     //         // setIsChecked(res.data.complete)
    //     //         // setTodoMessage(res.data.title)
    //     //     })
    //     //     todoDescription(data.description)
    //         async function getMyData() {
    //             setIsLoading(true)
    //             const mydata = await axios.get(`http://127.0.0.1:8000/task-detail/${id}/`)
    //             // setGetData(mydata.data)
    //             // console.log(mydata.data.title)
    //             // console.log(mydata.data)
    //             setTodoMessage(mydata.data.title)
    //             setTodoDescription(mydata.data.description)
    //             setSetDafaultDate(moment(mydata.data.birthdayDate))
    //             setTodoTags(mydata.data.tag)
    //             setIsChecked(mydata.data.complete)
    //             setIsLoading(false)
    //         }
    //         getMyData()

    //         .catch(err => {
    //             console.log("error caught", err)
    //         })
    //   }, [])

    const handleChange = (e) => {
        // console.log(e.target.value);
        setTodoMessage(e.target.value);
    }

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
            ['tag', todoTags],
            ['complete', isChecked],
        ])
        const obj = Object.fromEntries(entry);
        console.log(obj);
        e.preventDefault();
        // console.log(typeof(obj))

        var url = `http://127.0.0.1:8000/task-update/${id}/`
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(response => {
            // window.location.redirect("/home2/")
            window.location.href = "http://localhost:3000/";
        })
    }

    const handleCancel = () => {
        window.location.href = "http://localhost:3000/";
    }
      
  return (
    <Layout>
            <Content>
                {isLoading ? 'Loading...' : (
                    <Form>
                        <Title underline={true} align="center">Enter your Task Here</Title>
                        <Row style={{ paddingTop: '5px' }} >
                            <Col xxl={2} xl={2} lg={2} md={2} sm={0} xs={0} />
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={8} xl={8} lg={8} md={8} sm={16} xs={16} >
                                <Form.Item label="Title" name="Title" rules={[{ required: true, message: 'Please Enter Title' }]}>
                                    <Input showCount maxLength={100} onChange={handleChange} defaultValue={todoMessage} placeholder="Enter Task Title" />
                                </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />

                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={8} xl={8} lg={8} md={8} sm={16} xs={16} >
                            <Form.Item label="Description" name="Description" rules={[{ required: true, message: 'Please Enter Title' }]}>
                                <TextArea showCount rows={1} maxLength={1000} defaultValue={todoDescription} onChange={handleChange3} placeholder="Enter Description" />
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
                                        <Select.Option value="OPEN">OPEN</Select.Option>
                                        <Select.Option value="WORKING">WORKING</Select.Option>
                                        <Select.Option value="DONE">DONE</Select.Option>
                                        <Select.Option value="OVERDUE">OVERDUE</Select.Option>
                                    </Select>
                            </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />

                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={4} xl={4} lg={4} md={4} sm={16} xs={16} >
                                <Form.Item label="Tags" name="Tag">
                                    <Input showCount maxLength={100} onChange={handleChange2} defaultValue={todoTags} placeholder="'play','read' " />
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
                                        <DatePicker onChange={onDateChange} defaultValue={setDafaultDate} />
                                    </Space>
                                </Form.Item>
                            </Col>
                            <Col xxl={1} xl={1} lg={1} md={1} sm={4} xs={4} />
                            <Col xxl={2} xl={2} lg={2} md={2} sm={0} xs={0} />
                        </Row>
                        <div align="center" style={{ paddingTop: '5px' }} >
                        <Button type="primary" onClick={handleSubmit}>Edit</Button>
                        <Button style={{ marginLeft: '5px' }} danger onClick={handleCancel}>Cancel</Button>
                        </div>
                    </Form>
                ) }
            </Content>
        </Layout>
  )
}

export default EditPage