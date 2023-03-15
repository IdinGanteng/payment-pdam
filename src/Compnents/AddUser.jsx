import React, { useState } from 'react';
// import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@material-ui/core';
import { addUser } from '../service/api';
import { Button, Form, Input, message, Upload } from 'antd';
import { useHistory, useNavigate } from 'react-router-dom';


const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  bio:"",
}
const { TextArea } = Input;

const AddUser = () => {
    
  const [user, setUser] = useState(initialValue);
  const { name, username, email, phone, bio} = user;

  // const history = useHistory();
  const navigate = useNavigate();
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const noWA={phone}
  const pesan="anda sudah bayar.";
  const pesanWA = () => {
    const url=`https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`;
    window.open(url);
  }
  const pesanWAotomatis = () => {
    setTimeout(pesanWA,3000);
  }
  const addUserDetails = async () => {
    await addUser(user);
    pesanWAotomatis();
    console.log(user);
    // history.push('/all');
    navigate("/all");
  }


  return (
    <>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: "150px 300px"
        }}
      >
        <Form.Item
          label="name"
        >
          <Input onChange={onValueChange} name="name" value={name} />
        </Form.Item>
        <Form.Item
          label="username"
        >
          <Input onChange={onValueChange} name="username" value={username} />
        </Form.Item>
        <Form.Item
          label="email"
        >
          <Input onChange={onValueChange} name="email" value={email} />
        </Form.Item>
        <Form.Item
          label="phone"
        >
          <Input onChange={onValueChange} name="phone" value={phone}  />
        </Form.Item>
        <Form.Item
          label="bio"
        >
          <TextArea onChange={onValueChange} name="bio" value={bio}  />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" onClick={() => addUserDetails()} >
            Submit
          </Button>
          {/* <Button type="primary" onClick={()=> pesanWAotomatis()}>
        send wa
      </Button> */}
        </Form.Item>
      </Form>
    </>

  )
}


export default AddUser;