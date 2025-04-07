import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SetGrade() {
  const { std, mod } = useParams(); 
  const [student, setstudent] = useState();
  const [exam, set_exam] = useState();
  const [CA, set_CA] = useState();
  const navigate = useNavigate(); 

  useEffect(
    () => {
    fetch(`http://localhost:8000/api/student/${encodeURIComponent(std)}`).then(res => res.json()).then(data => setstudent(data));
    return;
  }, [])

  const Submit = (e) => {
    e.preventDefault();
    const form = {
      module: `http://localhost:8000/api/module/${mod}/`,
      ca_mark: CA,
      exam_mark: exam,
      cohort: student?.cohort,
      student: `http://localhost:8000/api/student/${std}/`
    };
  
    fetch("http://localhost:8000/api/grade/", {
      method: "POST", 
      headers: {
      'Content-Type' : 'application/json'},
      body: JSON.stringify(form)
    }).then(res => {
      if (res.ok) return res.json();
      else {
        res.text().then(s => alert("Form data invalid!\nMessage:\n\n"+s));
        throw new Error();}
    }).then(() => { 
      setstudent(); set_exam(); set_CA();
      navigate(`/student/${std}`);
    }).catch(e =>{console.log(e)});
  }

  return (
    <Form style={{width: '50%', marginLeft:'25%'}} onSubmit={Submit} className="text-bg-secondary bg-gradient">
        <br/>
          <Form.Label className="fw-bold font-monospace" htmlFor="Module">Setting {student?.first_name} {student?.last_name}'s grades for:</Form.Label> <br/>
        <Form.Control className="text-bg-secondary" style={{width: '80%', marginLeft:'10%'}} type="text" id="Module" name="Module" value={mod} disabled /> <br/>
          <Form.Label className="fw-bold font-monospace" htmlFor="ca">CA Mark </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="ca" name="ca" value={CA} onChange={e => set_CA(e.target.value)} required /> <br/>
          <Form.Label className="fw-bold font-monospace" htmlFor="exam">Exam Mark </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="exam" name="exam" value={exam} onChange={e => set_exam(e.target.value)} required /> <br/>
          <Form.Label className="fw-bold font-monospace" htmlFor="Cohort">Cohort </Form.Label> <br/>
        <Form.Control className="text-bg-secondary" style={{width: '80%', marginLeft:'10%'}} type="text" id="Cohort" name="Cohort" value={student?.cohort} disabled /> <br/>
          <Form.Label className="fw-bold font-monospace" htmlFor="Student">Student </Form.Label> <br/>
        <Form.Control className="text-bg-secondary" style={{width: '80%', marginLeft:'10%'}} type="text" id="Student" name="Student" value={std} disabled /> <br/>
        <Button type="submit">Submit</Button>
        <br/>
        <br/>
    </Form>
  );
}

