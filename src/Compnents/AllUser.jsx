import React, { useEffect, useState } from 'react';
import {  Table,TableCell, TableRow, TableHead, TableBody, makeStyles, Button } from '@material-ui/core';
import { deleteUser ,getallUsers } from '../service/api';
import { Link } from 'react-router-dom';
import './style.css';

const useStyle = makeStyles({
    table: {
        width: '80%',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'10px'

    },
    thead:{
        '& > *':{
            background: '#000000',
            color:'#FFFFFF',
            fontSize: '16px',
            position:'sticky'
        }
    },
    trow:{
        '& > *':{
            fontSize: '16px'
        }
    }
})

const AllUsers = () => {

    const classes = useStyle();

    const [user, setUser] = useState([]);
    // const [name, setName] = useState([]);
    // const [username, setUsername] = useState([]);
    // const [email, setEmail] = useState([]);
    // const [phone, setPhone] = useState([]);
    // const [bio, setBio] = useState([]);
    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () =>{
        const response = await getallUsers();
        console.log(response);
        setUser(response.data);
        // setName(response.data);
        // setUsername(response.data);
        // setEmail(response.data);
        // setPhone(response.data);
        // setBio(response.data);
    }

    const deleteData = async (id) => {
        await deleteUser(id);
        getUsers();
    }

    return (
        <div className='tabel'>
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Alamat</TableCell>
                    <TableCell>Total Penggunaan</TableCell>
                    <TableCell>Total Pembayaran</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                user.map((data) => (
                    <TableRow className={classes.trow}>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.nama}</TableCell>
                        <TableCell>{data.alamat}</TableCell>
                        <TableCell>{data.totalAirPerM3}</TableCell>
                        <TableCell>{data.totalPembayaran}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" style={{margin: '0px 20px'}} component={Link} to={`/edit/${data.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" style={{margin: '0px 20px'}} onClick={() => deleteData(data.id)}>Delete</Button>
                            <Button variant="contained" color="primary" style={{margin: '0px 20px'}} component={Link} to={`/profile/${data.id}`}>Profile</Button>
                        </TableCell>
                    </TableRow>
                    
                ))
            }
            </TableBody>
        </Table>
        </div>
    )
}

export default AllUsers;
