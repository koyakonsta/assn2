import { Outlet, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Degree() {
  const { dg } = useParams(); 
  const [cohorts, setcohorts] = useState();
  const [degree, setdegree] = useState();
  useEffect(
    () => {
    fetch(`http://localhost:8000/api/cohort/?degree=${encodeURIComponent(dg)}`).then(res => res.json()).then(data => setcohorts(data));
    fetch(`http://localhost:8000/api/degree/${encodeURIComponent(dg)}`).then(res => res.json()).then(data => setdegree(data));
    return;
  }, [])
  
  console.log(cohorts);
  console.log(dg);
  
  return (
    
      <Table  striped>
        <thead>
          <tr> <th>Cohorts in {degree?.shortcode} | {degree?.full_name}</th> </tr>
          <tr> <th>Cohort ID</th> <th>Year</th> <th>Name</th> </tr>
        </thead>
        <tbody>
          {cohorts?.map((ch) => (
            <tr key={ch.id}>
              <td>{ch.id}</td>
              <td>{ch.year}</td>
              <td>{ch.name}</td>
              <td><Link to={ `/cohort/${ch.id}` }>Go to cohort</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
}

