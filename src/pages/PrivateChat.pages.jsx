import React,{useEffect,useState} from 'react';
import io from "socket.io-client"
import {useParams} from "react-router-dom";
import {uid} from "uid"
import {Link} from "react-router-dom"
let socket;
const PrivateChat = () => {
    const {friend ,user} = useParams();
    const [chatInfo,setChatInfo] = useState({});
    const [msgs,setMsgs] = useState([{
        sender:"",
        reciever:"",
        text:""
    }]);
    const [count,setCount] = useState(0)
    const [currentMsg,setCurrentMsg] = useState("")
    useEffect(() =>{
       

        socket=io("127.0.0.1:3002",{transports: ['websocket']});
        setChatInfo({
            friend,
            user
        })
          socket.emit("connected",user)
          socket.on("recieve-message",(data) => {
            if(data.sender === user || data.sender === friend){
               
            const msgArr= msgs
            msgArr.push({
                ...data,
                id:uid()
            });
            setMsgs(msgArr)
            setCount(count + 1)
            
        }
        else{
            alert(`${data.sender} has send you a msg`)
        }
          })
        //return socket.disconnect()
    }, [msgs,friend,user,count]);

    const onClickHandle = () => {
        if(currentMsg.length > 0){
            const data= {
                sender:chatInfo.user,
                reciever:chatInfo.friend,
                text:currentMsg
            }
        socket.emit("send-message",data)
        const msgArr= msgs
        msgArr.push({
            ...data,
            Id:uid()
        });
        console.log(msgArr)
        setMsgs(msgArr) 
        setCurrentMsg("");
        setCount(count + 1)

    }
    }
 
    return ( 
        <div className="">
                {
                    msgs.map(msg => {
                        return(
                            <div className="" key={msg.Id}>{msg.sender}:{msg.text}</div>
                        )
                    })
                }
                <p style={{display:"none"}}>{count}</p>
                <input type="text" onChange={({target}) => setCurrentMsg(target.value)} value={currentMsg}/>
                <button onClick={onClickHandle}>Submit</button>
                <Link to="/chatdir"> back </Link>
        </div>
     );
}
 
export default PrivateChat;