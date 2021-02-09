import {SearchPanel} from './search-panel'
import {List} from './list'
import {useState, useEffect} from "react"
import {cleanObject} from '../../utils'
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = ()=>{
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const [list,setList] = useState([])
    const [users,setUsers] = useState([])
    useEffect(()=>{
        //fetch return a promise, so use 'then' to handle response
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response =>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[param])
    //if no param inside, will only render once when loading
    useEffect(()=>{
        //fetch return a promise, so use 'then' to handle response
        fetch(`${apiUrl}/users`).then(async response =>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    },[])
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}></List>
    </div>
}