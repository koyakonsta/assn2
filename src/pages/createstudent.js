import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CreateStudent() {
  const [id, set_id] = useState(0);
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [cohort, set_cohort] = useState("");
  const navigate = useNavigate();
  
  const Submit = (e) => {
    e.preventDefault();
    const form = {
      // id: id,
      first_name: first_name,
      last_name: last_name,
      cohort: `http://localhost:8000/api/cohort/${cohort}/`,
    };
  
    fetch("http://localhost:8000/api/student/", {
      method: "POST", 
      headers: {
      'Content-Type' : 'application/json'},
      body: JSON.stringify(form)
    }).then(res => {
      if (res.ok) return res.json();
      else {
        res.text().then(s => alert("Form data invalid!\nMessage:\n\n"+s));
        throw new Error();}
    }).then((res) => {
      navigate(`/student/${res.student_id}`);
    }).catch(e =>{console.log(e)});
  }

  return (
    <Form style={{width: '90%', marginLeft:'5%'}}onSubmit={Submit} className="text-bg-secondary bg-gradient">
        <br/>
        {/* <Form.Label className="fw-bold font-monospace" htmlFor="id">Student's ID </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="id" name="id" value={id} onChange={e => set_id(e.target.value)} required /> <br/> */}
        <Form.Label className="fw-bold font-monospace" htmlFor="first_name">Student's first_name </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="first_name" name="first_name" value={first_name} onChange={e => set_first_name(e.target.value)} required /> <br/>
        <Form.Label className="fw-bold font-monospace" htmlFor="last_name">Student's last_name </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="last_name" name="last_name" value={last_name} onChange={e => set_last_name(e.target.value)} required /> <br/>
        <Form.Label className="fw-bold font-monospace" htmlFor="cohort">Student's cohort </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="cohort" name="cohort" value={cohort} onChange={e => set_cohort(e.target.value)} required /> <br/>
        <Button type="submit">Submit</Button>
        <br/>
        <br/>
    </Form>
  );
}

