import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendList = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.userinfo.value);
  let [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        let data = item.val();
        if (data.senderid === user.uid || data.receiverid === user.uid) {
          arr.push(data);
        }
      });
      setFriendList(arr);
    });
  }, [db, user.uid]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-80 h-96 flex flex-col">
      <h3 className="text-xl font-semibold border-b pb-2 mb-3">Friend List</h3>

      <div className="space-y-3 overflow-y-auto">
        {friendList.map((item, i) => (
          <div key={i} className="flex justify-between p-2 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full">
                {(user.uid === item.senderid ? item.receivername : item.sendername).slice(0, 1)}
              </div>
              <span>
                {user.uid === item.senderid ? item.receivername : item.sendername}
              </span>
            </div>

            <button className="bg-blue-600 text-white px-3 rounded">Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
