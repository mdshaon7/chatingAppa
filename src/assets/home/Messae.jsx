// ChatUIStatic.jsx
// Static React component that reproduces the provided chat UI image (two-pane layout)
// Usage:
// 1) Create a React app (CRA/Vite) and install Tailwind CSS (optional — classes use Tailwind).
// 2) Put this file as ChatUIStatic.jsx and import it into a page: <ChatUIStatic />
// 3) If you don't use Tailwind, replace classNames with your CSS.

import React, { useEffect, useState } from 'react';
import FriendList from './FriendList';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { messageInfo } from '../../slices/messageSlice';

const contacts = [
    { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', last: 'Hello!' },
    { id: 2, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', last: 'See you' },
    { id: 3, name: 'Mike Johnson', avatar: '', last: 'Okay' },
    { id: 4, name: 'Emma Brown', avatar: '', last: 'Thanks!' },
];

const messages = [
    { id: 'm1', uid: 1, name: 'John Doe', text: 'Hello!', time: '10:12 AM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'm2', uid: 0, name: 'You', text: 'Hi John!', time: '10:13 AM' },
    { id: 'm3', uid: 1, name: 'John Doe', text: 'How are you?', time: '10:13 AM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'm4', uid: 0, name: 'You', text: "I'm good, thanks How about you?", time: '10:14 AM' },
];

export default function Message() {
    let dispatch = useDispatch()
    let db = getDatabase()
    let [friendList, setFriendList] = useState([])
    const user = useSelector((state) => state.userinfo.value);


    useEffect(() => {
        const friendRef = ref(db, "friends/");
        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                const data = item.val();
                if (data.senderid === user.uid || data.receiverid === user.uid) {
                    arr.push(data);
                }
            });
            setFriendList(arr);
        });
    }, [db, user.uid]);
    let heandleUserSelector = (item) => {
        dispatch(messageInfo(item))
        // console.log(item)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex  justify-center p-6">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-3" style={{ height: '640px' }}>

                {/* Left column - contacts */}
                <div className="col-span-1 p-6 border-r">
                    <h1 className="text-3xl font-extrabold mb-6">Chat</h1>

                    <div className="mb-6">
                        <div className="relative">
                            <input className="w-full bg-gray-100 rounded-full py-3 px-4 placeholder-gray-500 focus:outline-none" placeholder="Search" />
                            <svg className="w-5 h-5 absolute right-4 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {
                            friendList.map((item) => (
                                <div onClick={() => heandleUserSelector(item)} className={` border border-gray-200 overflow-y-scrollflex items-center justify-between p-3 rounded-lg`}>
                                    <div className="flex items-center gap-3">

                                        <div className="w-12 h-12 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold"></div>

                                        <div>
                                            <div className="font-semibold">{item.senderid === user.uid
                                                ? item.receivername
                                                : item.sendername}</div>
                                            <div className="text-sm text-gray-500"></div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400"> </div>
                                </div>
                            ))
                        }
                        {/* {contacts.map((c, i) => (
                            <div key={c.id} className={`flex items-center justify-between p-3 rounded-lg ${i === 0 ? 'bg-blue-50' : ''}`}>
                                <div className="flex items-center gap-3">
                                    {c.avatar ? (
                                        <img src={c.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold">{c.name[0]}</div>
                                    )}
                                    <div>
                                        <div className="font-semibold">{c.name}</div>
                                        <div className="text-sm text-gray-500">{c.last}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400"> </div>
                            </div>
                        ))} */}
                    </div>
                </div>

                {/* Right column - chat */}
                <div className="col-span-2 flex flex-col">
                    <div className="p-6 border-b flex items-center gap-4">
                        <h2 className="text-2xl font-bold">John Doe</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-white">
                        <div className="max-w-3xl mx-auto space-y-6">
                            {messages.map((m) => (
                                <div key={m.id} className={`flex ${m.uid === 0 ? 'justify-end' : 'justify-start'}`}>
                                    {m.uid !== 0 && (
                                        <img src={m.avatar} alt="a" className="w-12 h-12 rounded-full mr-4 self-end" />
                                    )}

                                    <div className={`rounded-2xl p-4 ${m.uid === 0 ? 'bg-blue-400 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`} style={{ whiteSpace: 'pre-wrap' }}>
                                        <div className="text-sm leading-relaxed">{m.text}</div>
                                        <div className={`text-xs mt-2 ${m.uid === 0 ? 'text-blue-100' : 'text-gray-500'}`}>{m.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t">
                        <div className="max-w-3xl mx-auto flex items-center gap-4">
                            <input className="flex-1 rounded-full border py-3 px-5 placeholder-gray-400 focus:outline-none" placeholder="Type a message..." />
                            <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center  ">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
