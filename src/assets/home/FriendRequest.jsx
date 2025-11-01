import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const FriendRequest = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.userinfo.value);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const requestRef = ref(db, "friendrequest/");
    onValue(requestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const data = item.val();
        if (data.receiverid === user.uid) {
          arr.push({ ...data, id: item.key });
        }
      });
      setFriendRequests(arr);
    });
  }, [db, user.uid]);

  // ✅ Confirm বোতাম — এখন কাজ করবে ঠিকভাবে
  const handleConfirm = (item) => {
    const friendRef = ref(db, "friends/");
    const newFriend = {
      senderid: item.senderid,
      sendername: item.sendername,
      senderemail:item.senderemail,
      receiverid: item.receiverid,
      receivername: item.receivername,
      receiveremail: item.receiveremail
    };

    const newFriendRef = push(friendRef);

    // আগে friends এ add করবো
    set(newFriendRef, newFriend)
      .then(() => {
        // তারপর request থেকে delete করবো
        return remove(ref(db, "friendrequest/" + item.id));
      })
      .then(() => {
        toast.success(`${item.sendername} এখন তোমার বন্ধু হয়েছে ✅`);
      })
      .catch((error) => {
        toast.error("সমস্যা হয়েছে ❌");
        console.error(error);
      });
  };

  // ❌ Delete বোতাম
  const handleDelete = (id) => {
    remove(ref(db, "friendrequest/" + id))
      .then(() => toast("রিকোয়েস্ট ডিলিট হয়েছে ❌"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 w-80 h-96 p-5 flex flex-col mt-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
        Friend Requests
      </h3>

      <div className="space-y-4 overflow-y-auto">
        {friendRequests.length > 0 ? (
          friendRequests.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {item.sendername[0]?.toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  {item.sendername}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleConfirm(item)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">কোনো রিকোয়েস্ট নেই 🙃</p>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
