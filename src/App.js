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
  const baseUrl = {
    github: "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"
  }
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({
    title: "",
    location: ""
  })
  const initialReqUrlRender = useRef(true);
  useEffect(() => {
    if (initialReqUrlRender.current) {
      initialReqUrlRender.current = false;
      getJobs(job)
    } else {
      getJobs(job);
    }
  }, [job]);

  const getJobs = async (job) => {
    //  Github 
    const realReqUrl = `${Config.sitesConfig.github.url}?description=${job.title}&location=${job.location}`
    console.log('githuburl', realReqUrl)
    let response = await fetch(realReqUrl, {
      method: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" }
    });
    let data = await response.json();
    let formattedData = formatData(data, 'github')
    let jobs = formattedData
    // setJobs(formattedData)

    // // Jooble
    // const url = `${Config.sitesConfig.jooble.url}${Config.sitesConfig.jooble.API_KEY}`
    // const params = {
    //   keywords: job.title,
    //   location: job.location
    // }

    // const otherParams = {
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: params,
    //   method: "POST"
    // }
    // fetch(url, otherParams)
    // .then(data => {return data.json()})
    // .then(res => {console.log(res)})
    console.log('title', job.title)
    let opts = {
      keywords: job.title === "" ? "it" : job.title,
      location: job.location,
      page: 2,
      searchMode: 1
    }
    response = await fetch('https://cors-anywhere.herokuapp.com/https://jooble.org/api/34852776-0e67-43d5-92f3-87b38f1f01d4', {
      method: 'post',
      body: JSON.stringify(opts)
    })
    data = await response.json()
    console.log('--',data)
    data = data.jobs
    console.log('jb', data)
    formattedData = formatData(data, 'jooble')
    jobs = jobs.concat(formattedData)
    setJobs(jobs)
  };

  const formatData = (data, site) => {
    const newData = data.map(data => formatGithubData(data, site))
    console.log(newData)
    return newData
  }

  const formatGithubData = (data, site) => {
    const formattedData = {}
    if (site === 'github') {
      Object.assign(formattedData, {
        from: "github",
        id: data.id,
        title: data.title,
        location: data.location,
        company: data.company,
        created_at: data.created_at,
        url: data.url
      })
    } else if (site === 'jooble') {
      Object.assign(formattedData, {
        from: "facebook",
        id: data.id,
        title: data.title,
        location: data.location,
        company: data.company,
        created_at: data.updated,
        url: data.link
      })
    }
    return formattedData
  }




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
