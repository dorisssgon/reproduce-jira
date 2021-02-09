export const List = ({list,users}) =>{
    return <table>
        <thead>
            <tr>
                <th>name</th>
                <th>manager</th>
            </tr>
        </thead>
        <tbody>
            {list.map((project,key)=><tr key={key}>
                <td>{project.name}</td>
                <td>{users.find(user =>user.id === project.personId)?.name || 'unknown'}</td>
            </tr>)}
        </tbody>
    </table>

}