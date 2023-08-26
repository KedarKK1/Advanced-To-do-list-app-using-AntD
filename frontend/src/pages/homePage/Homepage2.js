import React from 'react'
import { useState, useRef } from 'react';
import FetchData from '../../components/FetchData';
import { Switch } from 'antd';
import { DatePicker, Space } from 'antd';
// import "antd/dist/antd.css"; //important to import this line otherwise it will not show antd css
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// var moment = require('moment');

const Homepage2 = (props) => {
    const [todoMessage, setTodoMessage] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    // const [setDafaultDate, setSetDafaultDate] = useState(null);
    const [setDafaultDate] = useState(null);

    const inputRef = useRef(null);

    const handleChange = (e) => {
        // console.log(e.target.value);
        setTodoMessage(e.target.value);
    }

    // const handleChange2 = (e) => {
    //   let value2 = e.target.value;
    //   setBirthDate(value2);
    // }

    const handleChange3 = () => {
        setIsChecked(!isChecked);
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
            ['birthdayDate', birthDate],
            ['complete', isChecked],
        ])
        const obj = Object.fromEntries(entry);
        console.log(obj);
        e.preventDefault();
        // console.log(typeof(obj))

        var url = 'http://127.0.0.1:8000/task-create/'
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(response => {
            <FetchData />
            window.location.reload();
        })
    }
    return (
        <div  >
            <div className="App my-3 mx-3">
                <div id="task-container">
                    <div id="form-wrapper">
                        <form id="form">
                            <h1><b>Enter your Task Here</b></h1>
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 my-3">
                                    <input className="form-control" name="title" id="mytitle" type="text" ref={inputRef} onChange={handleChange} value={todoMessage} placeholder="Enter birthday boy's/girl's Name" />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 my-3">
                                    {/* here dont use for instead use htmlFor as in react like className */}
                                    <label htmlFor="isComplete">Is Complete : </label>
                                    <Switch className="mx-1" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} checked={isChecked} value={isChecked} onChange={handleChange3} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 my-3">
                                    {/* here dont use for instead use htmlFor as in react like className */}
                                    <label htmlFor="mybirthdaytime">Birthday (date) : </label>
                                    {/* <input type="date" id="mybirthdaytime" onChange={handleChange2} value={birthDate} name="mybirthdaytime"/> */}
                                    <Space direction="vertical">
                                        {/* do not give value="bdayValue" to this this will give an moment object */}
                                        <DatePicker className="mx-1" onChange={onDateChange} defaultValue={setDafaultDate} />
                                    </Space>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <input className="btn btn-warning" onClick={handleSubmit} id="submit" type="submit" />
                            </div>
                        </form>
                    </div>

                    <hr />

                    <h1><b>Your Tasks list is : </b></h1>
                    <FetchData setTodoMessage={setTodoMessage} setTodoComplete={setIsChecked} setTodoDate={onDateChange} />
                </div>
            </div>
        </div>
    )
}

export default Homepage2;