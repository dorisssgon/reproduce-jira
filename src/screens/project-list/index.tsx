import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "utils/http";

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
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users}></List>
    </div>
  );
};
