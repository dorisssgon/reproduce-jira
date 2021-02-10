
export const SearchPanel = ({users,param,setParam}) =>{
    return (
        <form>
            <div>
            <input type="text" value={param.name} onChange={(e)=>{setParam({
                ...param,
                name:e.target.value}
            )}}/>
            <select value={param.personId} onChange={(e)=>{setParam({
                ...param,
                personId:e.target.value
            })}}>
                <option value="">manager</option>
                {users.map((user,key)=><option key={key} value={user.id}>{user.name}</option>)}
            </select>
            </div>
        </form>
    )
}