import React from "react";
import { Container, CardDeck, CardColumns, CardGroup } from "react-bootstrap";
import JobItem from "./../../components/JobItem/JobItem";
export default function JobsList({ jobs }) {
  return (
    <CardColumns>
        {jobs.map(job => (
          <JobItem key={job.id} job={job} />
        ))}
    </CardColumns>
  );
}
