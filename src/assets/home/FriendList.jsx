import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const FriendList = () => {
    const user = useSelector((state) => state.userinfo.value);
  let db = getDatabase()
let [friendList,setFriendList]=useState([])
 useEffect(() => {
     const requestRef = ref(db, "friendrequest/");
     onValue(requestRef, (snapshot) => {
       let arr = [];
       snapshot.forEach((item) => {
         let data = item.val();
        if (data.senderid === user.uid || data.receiverid === user.uid) {
         arr.push(item.val());
        }
       });
       setFriendList(arr);
     });
   }, [db]);


  return (
      <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 w-80 h-96 p-5 flex flex-col">
    <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
      Friend List
    </h3>
    <div className="space-y-4 overflow-y-auto">

      {
        friendList.map((item)=>(
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
            S
          </div>
          <span className="text-gray-700 font-medium text-lg">Sahh Ali</span>
        </div>
<button className='py-[8px] px-[15px] bg-blue-700 rounded-[7px] text-white'>Friend</button>
      </div>
        ))
      }
    
      {/* <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold">
            F
          </div>
          <span className="text-gray-700 font-medium text-lg">Fahad Rahat</span>
        </div>
<button className='py-[8px] px-[15px] bg-blue-700 rounded-[7px] text-white'>Friend</button>      </div>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold">
            M
          </div>
          <span className="text-gray-700 font-medium text-lg">Maraia</span>
        </div>
<button className='py-[8px] px-[15px] bg-blue-700 rounded-[7px] text-white'>Friend</button>      </div>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition">
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium text-lg">Arif</span>
        </div>
<button className='py-[8px] px-[15px] bg-blue-700 rounded-[7px] text-white'>Friend</button>      </div>
      &nbsp;&nbsp; */}
    </div>
  </div>


  )
}

export default FriendList
 