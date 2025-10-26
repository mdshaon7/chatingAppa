import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  const currentUser = useSelector((state) => state.userinfo.value);
  const [userList, setUserList] = useState([]);
  const [requestList, setRequestList] = useState([]);

  // 🔹 Load all users except current user
  useEffect(() => {
    if (!currentUser?.uid) return;

    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // নিজের id বাদ দিচ্ছি
        if (item.key !== currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
  }, [db, currentUser?.uid]);

  // 🔹 Load all friend requests
  useEffect(() => {
    const requestRef = ref(db, "friendrequest/");
    onValue(requestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setRequestList(arr);
    });
  }, [db]);

  // 🔹 Send Friend Request
  const handleFriendRequest = (item) => {
    if (!currentUser?.uid || !item?.id) return;

    // নিজের কাছে নিজেকে রিকোয়েস্ট পাঠাতে না পারি
    if (currentUser.uid === item.id) {
      alert("You cannot send a friend request to yourself!");
      return;
    }

    // Firebase-এ request পাঠানো
    push(ref(db, "friendrequest/"), {
      senderid: currentUser.uid,
      sendername: currentUser.displayName,
      senderemail: currentUser.email,
      receiverid: item.id,
      receivername: item.name,
      receiveremail: item.email,
    });
  };

  // 🔹 Check if request already sent
  const isRequestSent = (item) => {
    return requestList.some(
      (req) =>
        req.senderid === currentUser.uid && req.receiverid === item.id
    );
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 w-80 h-96 p-5 flex flex-col">
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
        User List
      </h3>

      <div className="space-y-4 overflow-y-auto">
        {userList.length === 0 && (
          <p className="text-gray-500 text-sm">No other users found</p>
        )}

        {userList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                {item.name?.slice(0, 1)?.toUpperCase() || "U"}
              </div>
              <span className="text-gray-700 font-medium text-lg">
                {item.name || item.fullname || item.displayName || "Unknown User"}
              </span>
            </div>

            {isRequestSent(item) ? (
              <button className="py-[8px] px-[15px] bg-gray-400 rounded-[7px] text-white cursor-default">
                Pending
              </button>
            ) : (
              <button
                onClick={() => handleFriendRequest(item)}
                className="py-[8px] px-[15px] bg-blue-700 rounded-[7px] text-white cursor-pointer"
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
