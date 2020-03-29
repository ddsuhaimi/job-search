import React, { useEffect, useState, useRef } from "react";
import Config from './config/Config'
import Header from "./containers/Header/Header";
import BigJumbo from "./containers/BigJumbo/BigJumbo";
import SearchJob from "./components/SearchJob/SearchJob";
import JobsList from "./containers/JobsList/JobsList";
import Footer from "./containers/Footer/Footer"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { stringify } from "query-string";
// import axios from "axios";

export default function App() {
  const baseUrl = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json" 
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({
    title: "",
    location: ""
  })
  const initialReqUrlRender = useRef(true);
  const initialJobTitleRender = useRef(true);
  const initialQueryParamsRender = useRef(true);
  useEffect(() => {
    if (initialReqUrlRender.current) {
      initialReqUrlRender.current = false;
      getJobs()
    } else {
      getJobs();
    }
  }, [job]);

 const getJobs = async () => {
    const realReqUrl = `${baseUrl}?description=${job.title}&location=${job.location}` 
    const response = await fetch(realReqUrl, {
      method: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" }
    });
    const data = await response.json();
    setJobs(data);
  };
  
  return (
    <div className="App">
      <Header />
      <BigJumbo />
      <Container>
        <SearchJob
          updateJobDetail={setJob} 
        />
        <JobsList jobs={jobs} />
      </Container>
      <Footer />
    </div>
  );
}

// export default App;
