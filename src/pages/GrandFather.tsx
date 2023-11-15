import OpenAI from "openai";
import { useState, FormEvent } from "react";
import { ChatWindow, Message, ChatForm } from "../style/gfStyled";
import { useAppSelector } from "../store/hook";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs";


const GrandFather = () => {
  const { loginUser } = useAppSelector(state => state.membersData) 
  // OpenAI 연결 만들기
  const secretKey = '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';
  const openai = new OpenAI({
      apiKey: secretKey,
      dangerouslyAllowBrowser: true
  });

  const [input, setInput] = useState<string>('');
  type Message = {
    user: string;
    text: string;
  };
  const [chats, setChats] = useState<Message[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    
    const assistant = await openai.beta.assistants.retrieve('asst_Oqtmgnch1GlrhHAs7aLGZPlo')
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
    }, 0);
    setInput('');

  };

  return (
    <>
      <ChatWindow>
        {chats.map((msg, index) => (
          <Message key={index} isai={msg.user === '뮤라밸 할아버지'}>
            {msg.user === '뮤라밸 할아버지' && <span><div className="icon"></div>{msg.user}</span>}
            <p className="content">
            {msg.text}
            </p>
          </Message>
        ))}
      </ChatWindow>
      <ChatForm onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
        />
        <button type="submit">전송</button>
      </ChatForm>
    </>
  )
}

export default GrandFather