import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Table } from 'react-bootstrap';

export default function Cohorts() {
  const [cohort, setcohort] = useState();
  useEffect(
    () => {
      fetch("http://localhost:8000/api/cohort/").then(res => res.json()).then(data => setcohort(data));
      return;
    }, [])

  return (
    
      <Table  striped>
        <thead>
          <tr>
            <th>Cohort ID</th>
            <th>Year</th>
            <th>Degree</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {cohort?.map((ch) => {
            let degree = ch.degree?.split("/")[ch.degree.split("/").length-2];
            return <tr key={ch.id}>
              <td>{ch.id}</td>
              <td>{ch.year}</td>
              <td>{degree}</td>
              <td>{ch.name}</td>
              <td><Link to={ `/cohort/${ch.id}` }>Go to cohort</Link></td>
              <td><Link to={ `/cohortmodules/${ch.id}` }>View modules delivered to this cohort</Link></td>
            </tr>
          })}
        </tbody>
      </Table>
  );
}

