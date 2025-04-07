import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Form, Button, Check } from 'react-bootstrap';

export default function CreateModule() {
  const navigate = useNavigate();
  
  const [code, set_code] = useState("");
  const [full_name, set_full_name] = useState("");
  const [ca_split, set_ca_split] = useState("");
  
  const [cohort_list, set_cohort_list] = useState([]);
  const [selected_cohorts, set_selected_cohorts] = useState([]);
  
  useEffect(
    () => {
      fetch("http://localhost:8000/api/cohort/").then(res => res.json()).then(data => set_cohort_list(data));
      return;
    }, [])
  
  const CheckboxClicked = (e) => {
    var val = e.target.value;
    var new_selected_cohort_list = [...selected_cohorts];

    if (e.target.checked) new_selected_cohort_list = [...selected_cohorts, val];
    else new_selected_cohort_list.splice(selected_cohorts.indexOf(val), 1);
    
    console.log(new_selected_cohort_list);
    set_selected_cohorts(new_selected_cohort_list);
  }

  const Submit = (e) => {
    e.preventDefault();
    const form = {
      code: code,
      full_name: full_name,
      ca_split: ca_split,
      delivered_to: selected_cohorts
    };
  
    fetch("http://localhost:8000/api/module/", {
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
      set_code(); set_full_name(); set_ca_split(); set_cohort_list(); set_selected_cohorts();
      navigate("/modules/");
    }).catch(e =>{console.log(e)});
  }

  return (
    <Form style={{width: '90%', marginLeft:'5%'}}onSubmit={Submit} className="text-bg-secondary bg-gradient ">
      <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="code">Module Code </Form.Label>                                                                            <br/>
      <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="code" name="code" value={code} onChange={e => set_code(e.target.value)} required />                 <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="name">Module Name </Form.Label>                                                                          <br/>
      <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="name" name="name" value={full_name} onChange={e => set_full_name(e.target.value)} required />         <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="ca_split">Module's CA Split </Form.Label>                                                                          <br/>
      <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="ca_split" name="ca_split" value={ca_split} onChange={e => set_ca_split(e.target.value)} required />         <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="id">Module's cohorts </Form.Label>                                                                        <br/>

      {cohort_list?.map(ch => 
      <Form.Check style={{width: '20%', marginLeft:'40%'}} type="checkbox" id={ch.id} label={ch.id} value={`http://localhost:8000/api/cohort/${ch.id}/`} onChange={CheckboxClicked} />
      )}

      <br/> <br/>
      <Button type="submit">Submit</Button>
      <br/> <br/>
    </Form>
  );
}

