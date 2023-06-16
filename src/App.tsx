import { useEffect } from 'react'

const App = () => {
  const Cors = 'https://cors-anywhere.herokuapp.com/'
  const EndPointCreate = 'https://api.notion.com/v1/pages/'
  const EndPointRead = 'https://api.notion.com/v1/databases/'
  const EndPointUpdate = 'https://api.notion.com/v1/databases/'
  const EndPointDelete = 'https://api.notion.com/v1/databases/'

  const notionKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_KEY

  const readData = async () => {
    try {
      const response = await fetch(`${Cors}${EndPointRead}${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const postData = async () => {
    try {
      const response = await fetch(`${Cors}${EndPointCreate}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties: {
            Name: {
              "title": [
                {
                  "text": {
                    "content": "Tuscan Kale"
                  }
                }
              ]
            }
          }
        })
      })
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error', error)
    }
  }

  return (
    <>
      <div onClick={() => {readData()}}>읽기</div>
      <div onClick={() => {postData()}}>쓰기</div>
    </>
  )
}

export default App
