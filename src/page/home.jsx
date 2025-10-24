import { useSelector } from 'react-redux'
import Navbar from '../assets/home/navbar'
import UserList from '../assets/home/UserList'
import FriendList from '../assets/home/FriendList'

const home = () => {
let user = useSelector((state) => state.userinfo.
value
)

  return (
    <main>
      <div className=' flex justify-center gap-10 mt-2'>
 <FriendList/>
<UserList/>
      
      </div>
      
    <Navbar userInfo={user} />
    </main>
  )
 
}

export default home
