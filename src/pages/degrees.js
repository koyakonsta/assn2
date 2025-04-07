import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Table } from 'react-bootstrap';

export default function Degrees() {
  const [degree, setDegree] = useState();
  useEffect(
    () => {
      fetch("http://localhost:8000/api/degree/").then(res => res.json()).then(data => setDegree(data));
      return;
    }, [])

  return (
    
      <Table  striped>
        <thead>
          <tr> <th>Degree Name</th> <th>Degree Code</th> </tr>
        </thead>
        <tbody>
          {degree?.map((deg) => (
            <tr key={deg.shortcode}>
              <td>{deg.full_name}</td>
              <td>{deg.shortcode}</td>
              <td><Link to={ `/degree/${deg.shortcode}` }>Go to degree</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
}

