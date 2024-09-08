
import { useEffect, useState } from 'react'
import './App.css'
interface RowDataProps{
     date: string,
     views: number,
     article: string
}
type DataProps = RowDataProps[]
const data: DataProps = 
[

    { date: "2022-09-01", views: 100, article: "Article 1" },

    { date: "2023-09-01", views: 100, article: "Article 1" },

    { date: "2023-09-02", views: 150, article: "Article 2" },

    { date: "2023-09-02", views: 120, article: "Article 3" },

    { date: "2020-09-03", views: 200, article: "Article 4" }

]
interface BodyProps{
  filterData: DataProps
}
const Body:React.FC<BodyProps> =({filterData})=>{
  useEffect(()=>{
   console.log(filterData)
  },[filterData])

  return (
    <>
    {filterData?.map((data,index)=><tr key={index}>
    <td >{data.date}</td>
    <td >{data.views}</td>
    <td >{data.article}</td>
  </tr>)}
    </>
  )
}


function App() {
  const [filterData, setFilterData] = useState<DataProps>()


  const dateHandler = () => {
    // setFilterData([]);
    const sort = [...data].sort((a, b) => b.date.localeCompare(a.date))
    console.log(sort)
    setFilterData(sort);
  };
  
  const viewsHandler = () => {
    // setFilterData([]);
    const sort = [...data].sort((a, b) => b.views - a.views)
      console.log(sort)
    setFilterData(sort);
  };
  useEffect(()=>{
    setFilterData(data)
  },[])
  // useEffect(()=>{
  //  console.log(filterData)
  // },[filterData])

  return (
    <>
      <h1>Date and Views Table</h1>
      <button onClick={dateHandler}>Sort by Date</button>
      <button  onClick={viewsHandler}>Sort by Views</button>
      <div className='Table'>
        <table>
          <thead>
            <tr className='rowhead'>
              <td>
                Date
              </td>
              <td>
                Views
              </td>
              <td>
                Article
              </td> 
            </tr>
          </thead>
          <tbody>
            <Body filterData={filterData || []}/>
          </tbody>
        </table>

      </div>
     
    </>
  )
}


export default App
