import { Outlet, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Module() {
  const { md } = useParams(); 
  const [module, setmodule] = useState();
  useEffect(
    () => {
    fetch(`http://localhost:8000/api/module/${encodeURIComponent(md)}`).then(res => res.json()).then(data => setmodule(data));
    return;
  }, [])
  
  console.log(module);
  
  return (
      <Table  striped>
        <thead>
          <tr><th>Viewing module {module?.code}</th></tr>
          <tr><th>Module Code</th> <th>Module Name</th><th>CA Split</th> <th> Cohorts receiving this module</th></tr>
        </thead>
        <tbody>
          <tr key={module?.code}>
            <td>{module?.code}</td>
            <td>{module?.full_name}</td>
            <td>{module?.ca_split}%</td>
          </tr>
          
          {module?.delivered_to.map((lnk) => {
            let cohort = lnk?.split("/")[lnk.split("/").length-2];
            return (
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><Link to={`/cohort/${cohort}`}>{cohort}</Link></td>
              </tr>
            ) 
          })}
        </tbody>
      </Table>
  );
}

