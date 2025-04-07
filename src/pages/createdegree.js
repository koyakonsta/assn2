import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CreateDegree() {
  const [full_name, set_full_name] = useState("");
  const [shortcode, set_shortcode] = useState("");
  const navigate = useNavigate();
  
  const Submit = (e) => {
    e.preventDefault();
    const form = {
      full_name: full_name,
      shortcode: shortcode
    };
  
    fetch("http://localhost:8000/api/degree/", {
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
      set_full_name(""); set_shortcode("");
      navigate("/");
    }).catch(e =>{console.log(e)});
  }

  return (
    <Form style={{width: '90%', marginLeft:'5%'}}onSubmit={Submit} className="text-bg-secondary bg-gradient">
        <br/>
        <Form.Label className="fw-bold font-monospace" htmlFor="full_name">Module's full name </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="full_name" name="full_name" value={full_name} onChange={e => set_full_name(e.target.value)} required /> <br/>
        <Form.Label className="fw-bold font-monospace" htmlFor="shortcode">Module's shortcode </Form.Label> <br/>
        <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="shortcode" name="shortcode" value={shortcode} onChange={e => set_shortcode(e.target.value)} required /> <br/>
        <Button type="submit">Submit</Button>
        <br/>
        <br/>
    </Form>
  );
}

