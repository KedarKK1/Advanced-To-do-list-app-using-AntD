import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Space, Table, Tag, Button, Modal } from 'antd';
var moment = require('moment');

function FetchData(props) {

  const editForm = (e) =>{

  }
  const [getData, setGetData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  // fetch('http://127.0.0.1:8000/task-list/')
  // .then(response => response.json())
  // .then(data => 
  //   // console.log('data: ',data))
  //   setGetData(data))

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/task-list/')
      .then(res => {
        // console.log(res)
        setGetData(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  

  // const deleteMessage = e => 
  // {
  //   console.log(e.index);
  //   // var url = 'http://127.0.0.1:8000/task-delete/'
  //   // fetch(url, {
  //   //   method:'POST',
  //   //   headers: { 'Content-Type': 'application/json'},
  //   // }).then(response =>{
  //   //   window.location.reload();
  //   // })
  // }

  return (
    <div id="list-wrapper">
      {/* <hr className="my-1" /> */}
      <div className="row my-3 task-wrapper flex-wrapper">

        <div style={{ flex: 3 }}>
          <span><b>Id</b></span>
        </div>

        <div style={{ flex: 1 }}>
          <span><b>title</b></span>
        </div>

        <div style={{ flex: 2 }}>
          <span><b>birthdayDate</b></span>
        </div>

        <div style={{ flex: 2 }}>
          <span><b>Owner id</b> </span>
        </div>

        <div style={{ flex: 2 }}>
          <span><b>Completed ?</b> </span>
        </div>

        <div style={{ flex: 1 }}><b>Edit</b></div>

        <div style={{ flex: 1 }}><b>Delete</b></div>
      
      </div>

      <hr className="px-5" />
      {getData.map(function (task, index) {
        return (
          <div key={index} className="row my-1  task-wrapper flex-wrapper">

            <div style={{ flex: 3 }}>
              <span>{task.id}</span>
            </div>

            <div style={{ flex: 1 }}>
              <span id={`title${task.id}`} >{task.title}</span>
            </div>

            <div style={{ flex: 2 }}>
              <span id={`bday${task.id}`} >{task.birthdayDate}</span>
            </div>

            <div style={{ flex: 2 }}>
              <span id={`owner${task.id}`} >{task.owner}</span>
            </div>

            <div style={{ flex: 2 }}>
              <span id={`owner${task.id}`} >{task.complete}</span>
              {/* <span id={`owner${task.id}`} >{task.complete ? "true" : "false" }</span> */}
            </div>

            <div style={{ flex: 2 }}>
              <span id={`owner${task.id}`} >{task.created_at}</span>
            </div>

            <div style={{ flex: 1 }}>
              <button className="btn btn-info" onClick={async () => {
                var url = `http://127.0.0.1:8000/task-detail/${task.id}/`
                let myData = await axios.get(url)
                console.log(myData.data);
                props.setTodoMessage(myData.data.title)
                props.setTodoComplete(myData.data.complete)
                // console.log(moment(`${myData.data.birthdayDate}`,'YYYY-MM-DD'),`${myData.data.birthdayDate}`)
                // props.setTodoDate(myData.data.birthdayDate)
                // not working below
                props.setTodoDate(moment(`${myData.data.birthdayDate}`,'YYYY-MM-DD'),`${myData.data.birthdayDate}`)

                // loading data
                // setToDoMessage(myData.data.title);
              }} >Edit</button>

              {/* <Button type="primary" onClick={showModal}>
                Edit
              </Button>
              <Modal
                title="Edit"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>
              </Modal> */}

            </div>

            <div style={{ flex: 1 }}>
              <button className="btn btn-danger" onClick={() => {
                var url = `http://127.0.0.1:8000/task-delete/${task.id}/`
                fetch(url, {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                }).then(response => {
                  window.location.reload();
                })
              }} >-</button>

            </div>
          </div>
        )
      })}

    </div>
  )
}

export default FetchData;