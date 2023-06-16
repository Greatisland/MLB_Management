import { Client } from "@notionhq/client"
import { useEffect, useState } from 'react'

// export default class NotionApi {
//   static async getItem(): Promise<any> {
//     const notionKey = process.env.REACT_APP_NOTION_KEY
//     const notionDatabaseKey = process.env.REACT_APP_NOTION_DATABASE_KEY

//     const notion = new Client({ auth: notionKey })
//     const response = await notion.databases.query({ database_id: notionDatabaseKey })
//     console.log(response)
//   }
// }
const App = () => {
  const EndPoint = 'https://cors-anywhere.herokuapp.com/https://api.notion.com/v1/databases/'
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const notionKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_KEY

  const [pages, setPages] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(EndPoint+databaseId+'/query', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${notionKey}`,
            'Notion-Version': '2022-06-28',
            "Content-Type": 'application/json'
          }
        });
        const data = await response.json();
        setPages(data.results);
        console.log(data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>

    </>
  )
}

export default App
