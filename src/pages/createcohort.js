import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CreateCohort() {
  const [id, setId] = useState("");
  const [year, setYear] = useState();
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [degreeList, setDegreeList] = useState();
  useEffect(
    () => {
      fetch("http://localhost:8000/api/degree/").then(res => res.json()).then(data => setDegreeList(data));
      return;
    }, [])
  const navigate = useNavigate();
  
  const Submit = (e) => {
    e.preventDefault();
    const form = {
      id: id,
      year: year,
      degree: degree,
      name: name
    };
  
    fetch("http://localhost:8000/api/cohort/", {
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
      setId(); setDegree(); setYear();
      navigate("/cohorts/");
    }).catch(e =>{console.log(e)});
  }

  return (
    <Form style={{width: '90%', marginLeft:'5%'}}onSubmit={Submit} className="text-bg-secondary bg-gradient ">
      <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="id">Cohort ID </Form.Label>                                                                            <br/>
      <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="id" name="id" value={id} onChange={e => setId(e.target.value)} required />                 <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="id">Cohort year </Form.Label>                                                                          <br/>
      <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="year" name="year" value={year} onChange={e => setYear(e.target.value)} required />         <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="id">Cohort name </Form.Label>                                                                          <br/>
      <Form.Control style={{width: '80%', marginLeft:'10%'}} type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required />         <br/>
      <Form.Label className="fw-bold font-monospace" htmlFor="id">Cohort degree </Form.Label>                                                                        <br/>
      <Form.Select style={{width: '80%', marginLeft:'10%'}} id="degree" name="degree" value={degree} onChange={e => setDegree("http://localhost:8000/api/degree/"+e.target.value+"/")} required > 
        <option disabled value=""> Select a Degree</option>
        {degreeList?.map(e => 
          <option value={e.shortcode}> {e.shortcode} </option>
        )}
      </Form.Select> <br/>
      <Button type="submit">Submit</Button>
      <br/> <br/>
    </Form>
  );
}

