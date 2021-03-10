import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();
  useEffect(() => {
    //fetch return a promise, so use 'then' to handle response
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);
  //if no param inside, will only render once when loading
  useMount(() => {
    //fetch return a promise, so use 'then' to handle response
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
