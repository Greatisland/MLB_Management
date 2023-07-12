export const NotionApi = {
  async readData(){
    try {
      const response = await fetch(`${process.env.NOTION_ENDPOINT}databases/${process.env.NOTION_DATABASE_KEY}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      data.results.sort((a: any, b: any) => new Date(a.properties.가입일.date.start).getTime() - new Date(b.properties.가입일.date.start).getTime())
      return data.results

    } catch (error) {
      console.error(error)
    }
  },

  async postData(name: string, join: string, year: string, etc: string, gender: string){
    try {
      await fetch(`${process.env.NOTION_ENDPOINT}pages/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parent: { database_id: process.env.NOTION_DATABASE_KEY },
          properties: {
            이름: {"title": [{"text": {"content": name}}]},
            가입일: {"date": {"start": join}},
            년생: {"rich_text": [{"text": {"content": year}}]},
            비고: {"rich_text": [{"text": {"content": etc}}]},
            성별: {"rich_text": [{"text": {"content": gender}}]}
          }
        })
      })

    } catch (error) {
      console.error('Error', error)
    }
  },

  async updateData(name: string, join: string, year: string, etc: string, gender: string, id: string){
    try {
      await fetch(`${process.env.NOTION_ENDPOINT}pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            이름: {"title": [{"text": {"content": name}}]},
            가입일: {"date": {"start": join}},
            년생: {"rich_text": [{"text": {"content": year}}]},
            비고: {"rich_text": [{"text": {"content": etc}}]},
            성별: {"rich_text": [{"text": {"content": gender}}]}
          }
        })
      })

    } catch (error) {
      console.error('Error', error)
    }
  },

  async deleteData(id: string){
    try {
      await fetch(`${process.env.NOTION_ENDPOINT}pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({archived: true})
      })

    } catch (error) {
      console.error('Error', error)
    }
  },

  async updatePay(id: string, target: string){
    try {
      await fetch(`${process.env.NOTION_ENDPOINT}pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            회비대상: {"rich_text": [{"text": {"content": target}}]},
          }
        })
      })

    } catch (error) {
      console.error('Error', error)
    }
  },

  async updateCheck(id: string, check: boolean){
    try {
      await fetch(`${process.env.NOTION_ENDPOINT}pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            납부체크: {"checkbox": check},
          }
        })
      })

    } catch (error) {
      console.error('Error', error)
    }
  }
}