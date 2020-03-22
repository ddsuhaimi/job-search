import React, { useEffect, useState, useRef } from "react";
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
  // const [search, setSearch] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("")
  const [queryParams, setQueryParams] = useState({});
  const [reqUrl, setReqUrl] = useState(baseUrl);
  const initialReqUrlRender = useRef(true);
  const initialJobTitleRender = useRef(true);
  const initialQueryParamsRender = useRef(true);
  useEffect(() => {
    if (initialReqUrlRender.current) {
      console.log('first reqUrl')
      initialReqUrlRender.current = false;
      getJobs()
    } else {
      console.log('sub reqUrl')
      getJobs();
    }
  }, [reqUrl]);

  useEffect(() => {
    if (initialJobTitleRender.current) {
      console.log('first Jobtitle')
      initialJobTitleRender.current = false;
    } else {
      console.log('sub Jobtitle')
      const newQueryParams = {
        ...queryParams,
        description: jobTitle,
        location: jobLocation
      };
      setQueryParams(newQueryParams);
    }
  }, [jobTitle, jobLocation]);

  useEffect(() => {
    if (initialQueryParamsRender.current) {
      console.log('first queryParams')
      initialQueryParamsRender.current = false;
    } else {
      console.log('sub queryParams')
      const queryStringUrl = stringify(queryParams);
      const realReqUrl = baseUrl + "?" + queryStringUrl;
      console.log("--", queryStringUrl, realReqUrl);
      setReqUrl(realReqUrl);
    }
  }, [queryParams]);

  const getJobs = async () => {
    // setReqUrl(`${reqUrl}?${stringify(queryParams)}`)
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" }
    });
    const data = await response.json();
    setJobs(data);
  };

  const updateJobTitle = async newJobTitle => {
    setJobTitle(newJobTitle);
    // console.log(await stringify(queryParams))
  };
  const updateJobLocation = async newJobLocation => {
    setJobLocation(newJobLocation)
  }
  return (
    <div className="App">
      <Header />
      <BigJumbo />
      <Container>
        <SearchJob 
          updateJobTitle={updateJobTitle} 
          updateJobLocation={updateJobLocation}
        />
        <JobsList jobs={jobs} />
      </Container>
      <Footer />
    </div>
  );
}

// export default App;
