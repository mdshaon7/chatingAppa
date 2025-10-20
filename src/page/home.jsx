import { useSelector } from 'react-redux'

const home = () => {
  let user = useSelector((state)=>state.userinfo.value.displayName)
  console.log(user)
  return (
    <div>
      home
      <h2>{user}</h2>
    </div>
  )
}

export default home
