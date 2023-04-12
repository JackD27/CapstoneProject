import React, { useState, useEffect } from "react";
import axios from "axios";
import { key }from '../../utilities/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import "../register/loginPage.css"

const BASE_URL = "https://finnhub.io/api/v1/stock/recommendation?symbol=";
const KEY_URL = `&token=${key}`;



const RecommendationStatsComp = (props) => {


    const [nameData, setNameData] = useState(props.name);
    
  const [stocksData, setStocksData] = useState({});

  async function getStocksData(stock){
    return await axios
      .get(`${BASE_URL}${stock}${KEY_URL}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  

  


  useEffect(() => {

    async function getList() {

        let tempData = []
        let promises = []
    
            
       try {
        
        promises.push(getStocksData(props.name).then(res =>{
            tempData.push({name: props.name, info: res.data})
        }))
        
        Promise.all(promises).then(()=>{
          setStocksData(tempData);
        })
        
        }catch(error){
            console.error("Error", error.message);
        }
        
      }

    

    getList(); 

    //setNameData(props.name)

    console.log(stocksData)
    

    
    

      


  }, [stocksData.length]);  

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  function dataGrabber(){
    let data = []
    if (stocksData.length > 0){
        data = [
            {
              name: monthNames[new Date(stocksData[0].info[3].period + 1).getMonth()] +" "+ new Date(stocksData[0].info[3].period).getFullYear(),
              StrongBuy: stocksData[0].info[3].strongBuy,
              Buy: stocksData[0].info[3].buy,
              Hold: stocksData[0].info[3].hold,
              Sell: stocksData[0].info[3].sell,
              StrongSell: stocksData[0].info[3].strongSell,
            },
            {
              name: monthNames[new Date(stocksData[0].info[2].period + 1).getMonth()] +" "+ new Date(stocksData[0].info[2].period).getFullYear(),
              StrongBuy: stocksData[0].info[2].strongBuy,
              Buy: stocksData[0].info[2].buy,
              Hold: stocksData[0].info[2].hold,
              Sell: stocksData[0].info[2].sell,
              StrongSell: stocksData[0].info[2].strongSell,
            },
            {
              name: monthNames[new Date(stocksData[0].info[1].period + 1).getMonth()] +" "+ new Date(stocksData[0].info[1].period).getFullYear(),
              StrongBuy: stocksData[0].info[1].strongBuy,
              Buy: stocksData[0].info[1].buy,
              Hold: stocksData[0].info[1].hold,  
              Sell: stocksData[0].info[1].sell,
              StrongSell: stocksData[0].info[1].strongSell,
            },
            {
              name: monthNames[new Date(stocksData[0].info[0].period + 1).getMonth()] +" "+ new Date(stocksData[0].info[0].period).getFullYear(),
              StrongBuy: stocksData[0].info[0].strongBuy,
              Buy: stocksData[0].info[0].buy,
              Hold: stocksData[0].info[0].hold,
              Sell: stocksData[0].info[0].sell,
              StrongSell: stocksData[0].info[0].strongSell,
            },
          ];
    }
    return data
  }

  

 

  const BarChartComp = ({dataVals}) => (
    
    <BarChart
            width={550}
            height={300}
            data={dataVals}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="StrongSell" stackId="a" fill="#990C0E" />
            <Bar dataKey="Sell" stackId="a" fill="#E5191C" />
            <Bar dataKey="Hold" stackId="a" fill="#D2CF1A" />
            <Bar dataKey="Buy" stackId="a" fill="#14A44D" />
            <Bar dataKey="StrongBuy" stackId="a" fill="#2D8E5D" />
          </BarChart>
  );


  return (
    <><h1 style={{ color: "white" }}>{props.name}</h1>
      {Object.keys(stocksData).length > 0 ? <><BarChartComp dataVals={dataGrabber()}/></>:"Nothing"}
      </>
  );
};

export default RecommendationStatsComp;