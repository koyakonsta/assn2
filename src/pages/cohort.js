import { Outlet, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Cohort() {
  const { ch } = useParams(); 
  const [students, setstudents] = useState();
  const [cohort, setcohort] = useState();
  useEffect(
    () => {
    fetch(`http://localhost:8000/api/student/?cohort=${encodeURIComponent(ch)}`).then(res => res.json()).then(data => setstudents(data));
    fetch(`http://localhost:8000/api/cohort/${encodeURIComponent(ch)}`).then(res => res.json()).then(data => setcohort(data));
    return;
  }, [])
  
  console.log(students);
  console.log(ch);
  
  return (
    
      <Table  striped>
        <thead>
          <tr> 
            <th>Students of {cohort?.id} | {cohort?.name}</th> <th></th>
            <th> <Link to={ `/cohortmodules/${cohort?.id}` }>View modules delivered to {cohort?.name}</Link> </th> 
          </tr>
          <tr> <th>Student ID</th> <th>First Name</th> <th>Last Name</th> <th>Email</th> </tr>
        </thead>
        <tbody>
          {students?.map((std) => (
            <tr key={std.student_id}>
              <td>{std.student_id}</td>
              <td>{std.first_name}</td>
              <td>{std.last_name}</td>
              <td>{std.email}</td>
              <td><Link to={ `/student/${std.student_id}` }>View student profile</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
}

