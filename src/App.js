import React from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button, FormLabel, Table } from 'react-bootstrap';
import { useEffect, useState,Container,Row,Modal } from 'react';
import { toast } from "react-toastify";
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  
  const [confirmDialog, setConfirmDialog] = useState ({isOpen:false,title:'',subTitle:''});
  
  const getEmployeeData = async () => {
    try {
      axios.get('http://localhost:1337/api/employee').then(res => {
        setEmployees(res.data.data);
        console.log(res.data.data);
        console.log(res.data);
        console.log(res);
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getEmployeeData();
  }, [])

  const addBtn = () => {
}
  console.log(employees);
  const jwt = localStorage.getItem('jwt');
  const deleteHandler = async(id,name) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
    await axios.delete(`http://localhost:1337/api/employee/${id}`,{
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
    },
    }).then(del => {
      getEmployeeData();
      toast.success(`Employee ${name} deleted Successfully!!`);
    }
    )
    console.log(id);
  }
  const createBtn = () => {
    setCreate(true)
    console.log(create);
  }
  useEffect(() => {
    createBtn();
    editBtn();
  }, [])
  const editBtn = () => {
    setEdit(true)
  }

  const logoutHandler=()=>{
    localStorage.setItem('user','');
    navigate('/')
  }
  return (<>
      
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-2 h1">Employee Details</span>
    </nav>
    <div className="App">
    
      <Link to={`/AddEdit`} state={{ create }}><Button variant='success'
        onClick={addBtn} data-toggle="modal" className='add-btn'>Add Employee</Button></Link>
      <Table striped bordered hover size="lg" className='table'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Mail Id</th>
            <th>Phone Number</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.attributes.EmployeeId}</td>
                <td>{item.attributes.EmployeeName}</td>
                <td>{item.attributes.Age}</td>
                <td>{item.attributes.City}</td>
                <td>{item.attributes.Email}</td>
                <td>{item.attributes.PhoneNumber}</td>
                <td>{item.attributes.Designation}</td>
                <td className='action'>
                  <div className='buttons'>
                    <Link to={`/addEdit/${item.id}`} state={{ edit }}><i class="fa fa-pencil edit" onClick={editBtn}></i></Link>
                    <i class="fa fa-trash delete" onClick={()=>setConfirmDialog({
                  isOpen:true,
                  title:'Are you sure to delete?',
                  subTitle:"You can't undo this operation",
                  onConfirm:()=>{deleteHandler(item.id,item.attributes.EmployeeName)}
                })
              } ></i>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <ConfirmDialog confirmDialog={confirmDialog}
  setConfirmDialog={setConfirmDialog} />
    </div>
<div className='logout-btn'><Button variant='dark' onClick={logoutHandler}>Logout</Button></div>
  </>
  );
}

export default App;
