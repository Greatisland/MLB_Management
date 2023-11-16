import OpenAI from "openai";
import { useState, FormEvent, useEffect, useRef } from "react";
import { ChatWindow, Message, ChatForm } from "../style/gfStyled";
import { useAppSelector } from "../store/hook";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs";
import { CircularProgress } from "@mui/material";
import Footer from "../components/common/Footer";
import { dbFunc } from "../firebase/firebaseFunc";

const svgStyled = {
  width: '30px',
  height: '30px',
  color: '#FF9CC7!important'
}

const GrandFather = () => {

  const { loginUser } = useAppSelector(state => state.membersData) 

  //메시지 상태확인
  const [isSend, setIsSend] = useState(false)

  // OpenAI 연결 만들기
  const secretKey = import.meta.env.VITE_OPENAI_KEY;
  const openai = new OpenAI({
      apiKey: secretKey,
      dangerouslyAllowBrowser: true
  });

  const [input, setInput] = useState<string>('');
  type Message = {
    user: string;
    text: string;
  };
  const [chats, setChats] = useState<Message[]>([
    {
      user: '뮤라밸 할아버지',
      text: '안녕하신가~ 나는 뮤라밸에 대해 잘 알고 있다네.'
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chats]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    setIsSend(true);
    
    const assistant = await openai.beta.assistants.retrieve(import.meta.env.VITE_ASSET)
    const thread = await openai.beta.threads.create();
  
    // 첫 번째 setChats 호출
    setChats([...chats, { user: loginUser.name, text: input }]);
    // setTimeout을 사용하여 다음 작업을 이벤트 루프의 다음 단계로 미룸
    setTimeout(async () => {
      await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: input,
      });
  
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
      });
  
      let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  
      while (runStatus.status !== 'completed') {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }
  
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessageForRun = messages.data
        .filter((message) => message.run_id === run.id && message.role === 'assistant')
        .pop();
      if (lastMessageForRun) {
        setChats([...chats, { user: loginUser.name, text: input }, 
          { 
            user: '뮤라밸 할아버지', 
            text: (lastMessageForRun.content[0] as MessageContentText).text.value
          }]);
      }
    setIsSend(false)
    //로그 저장
    dbFunc.chatLog(loginUser.name, {chatLog: chats})
    }, 0);
    setInput('');
  };
  
  return (
    <div>
      <ChatWindow>
        {chats.map((msg, index) => (
          <Message 
            key={index} 
            isai={msg.user === '뮤라밸 할아버지'}
          >
            {msg.user === '뮤라밸 할아버지' && <span><div className="icon"></div>{msg.user}</span>}
            <p className="content">
            {msg.text}
            </p>
          </Message>
        ))}
        <p className='notice'>뮤라밸 할아버지에게 모임에 대해 물어보세요!</p>
      </ChatWindow>
      <ChatForm onSubmit={handleSubmit}>
        {isSend ?
        <>
          <CircularProgress style={svgStyled}/>
          <p className='notice'>할아버지가 대답할 떄 까지 잠시만 기다려 주세요...</p>
        </>
        :
        <>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지 입력..."
          />
          <button type="submit">보내기</button>
        </>}
      </ChatForm>
      <Footer />
    </div>
  )
}

export default GrandFather