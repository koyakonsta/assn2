import { Outlet, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Cohort() {
  const { ch } = useParams(); 
  const [modules, setmodules] = useState();
  const [cohort, setcohort] = useState();
  useEffect(
    () => {
    fetch(`http://localhost:8000/api/module/?delivered_to=${encodeURIComponent(ch)}`).then(res => res.json()).then(data => setmodules(data));
    fetch(`http://localhost:8000/api/cohort/${encodeURIComponent(ch)}`).then(res => res.json()).then(data => setcohort(data));
    return;
  }, [])
  
  console.log(modules);
  console.log(ch);
  
  return (
    
      <Table  striped>
        <thead>
          <tr> <th>Modules delivered to {cohort?.id} | {cohort?.name}</th> </tr>
          <tr> <th>Module Code</th> <th>Module Name</th> <th>CA Split</th> </tr>
        </thead>
        <tbody>
          {modules?.map((mod) => (
            <tr key={mod.code}>
              <td>{mod.code}</td>
              <td>{mod.full_name}</td>
              <td>{mod.ca_split} %</td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
}

