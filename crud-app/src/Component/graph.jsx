import React , {Component, useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
const  App =()=> {
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
      const age = [];
      const salary = [];

      axios.get("http://localhost:8080/users").then(response =>{
          console.log("response", response)
          response.data.map(item => {
            console.log("item", item)
              age.push(item.salary);
              salary.push(item.yoj)
          })
          setCategory(salary)
          setData(age)
          console.log("age", age, salary)
      }).catch(e => {
          alert(e);
      })
  }, [])
  
    return (
      <Chart options={{
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: category
        }
      }} 
      series={[{
        name: 'Salary',
        data: data
      }]} type="bar" width={800} height={500} />
    )
}

export default App