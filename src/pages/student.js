import { Outlet, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Student() {
  const { std } = useParams(); 
  const [student, setstudent] = useState();
  const [grades, setgrades] = useState([]);
  const [modules, setmodules] = useState();
  useEffect(
    () => {
    (async () => {
      const res = await fetch(`http://localhost:8000/api/student/${encodeURIComponent(std)}`);
      const data = await res.json(); setstudent(data);
      fetch(`http://localhost:8000/api/grade/?student=${encodeURIComponent(std)}`).then(res => res.json()).then(data => setgrades(data));
      fetch(`http://localhost:8000/api/module/?delivered_to=${encodeURIComponent(data.cohort.split("/")[data.cohort.split("/").length-2])}`).then(res => res.json()).then(data => setmodules(data))
    })()
    return;
    }, [])
  
  console.log(modules);
  
  return (<>
      <Table  striped>
        <thead>
          <tr><th>Viewing student {student?.student_id}</th></tr>
          <tr><th>Student ID</th> <th>First Name</th><th>Last Name</th> <th>Cohort</th> <th>Email</th></tr>
        </thead>
        <tbody>
          <tr key={student?.student_id}>
            <td>{student?.student_id}</td>
            <td>{student?.first_name}</td>
            <td>{student?.last_name}</td>
            <td>{student?.cohort.split("/")[student?.cohort.split("/").length-2]}</td>
            <td>{student?.email}</td>
          </tr>
          
        </tbody>
      </Table>

      <Table  striped>
        <thead>
          <tr><th>{student?.first_name} {student?.last_name}'s Grades</th></tr>
          <tr><th>Module</th> <th>CA Mark</th><th>Exam Mark</th> <th>Cohort</th> <th>Total Grade</th></tr>
        </thead>
        <tbody>
          {grades?.map((grade) => {
            let mod = grade?.module.split("/")[grade?.module.split("/").length-2];
            return (
              <tr key={grade?.id}>
                <td>{grade?.module.split("/")[grade?.module.split("/").length-2]}</td>
                <td>{grade?.ca_mark}</td>
                <td>{grade?.exam_mark}</td>
                <td>{grade?.cohort.split("/")[grade?.cohort.split("/").length-2]}</td>
                <td>{grade?.total_grade}</td>
                <td><Link to={ `/setgrade/${student?.student_id}/${mod}` }>Set grade for {mod}</Link></td>
              </tr>
            ) 
          })}
        </tbody>
      </Table>

      <Table  striped>
        <thead>
          <tr><th>{student?.first_name} {student?.last_name}'s Modules</th></tr>
          <tr>
            <th>Module Code</th>
            <th>Module Name</th>
            <th>CA Split</th>
          </tr>
        </thead>
        <tbody>
          {modules?.map((mod) => (
            <tr key={mod.code}>
              <td>{mod.code}</td>
              <td>{mod.full_name}</td>
              <td>{mod.ca_split} %</td>
              <td><Link to={ `/module/${mod.code}` }>View module</Link></td>
              <td><Link to={ `/setgrade/${student?.student_id}/${mod.code}` }>Set grade for {mod.code}</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
  </>);
}

