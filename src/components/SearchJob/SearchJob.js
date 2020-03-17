import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

export default function SearchJob({ updateJobTitle }) {
  const [search, setSearch] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    setSearch(search);
    updateJobTitle(search);
    // console.log(object)
  };

  const onChange = e => {
    setSearch(e.target.value);
  };
  return (
    <Form className="mb-4" onSubmit={onSubmit}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <i className="fas fa-search" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          placeholder="Search Jobs"
          className="mr-sm-2"
          onChange={onChange}
        />
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <i className="fas fa-map-marker-alt" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          placeholder="Search Location"
          className="mr-sm-2"
        />
        <Button type="submit" variant="outline-info">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}
