import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Table } from 'react-bootstrap';

export default function Modules() {
  const [modules, setmodules] = useState();
  useEffect(
    () => {
      fetch("http://localhost:8000/api/module/").then(res => res.json()).then(data => setmodules(data));
      return;
    }, [])

  return (
      <Table  striped>
        <thead>
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
            </tr>
          ))}
        </tbody>
      </Table>
  );
}

