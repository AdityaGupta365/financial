/*import React from "react"
import {Line } from "@ant-design/charts"
import { Pie } from "@ant-design/charts";
function ChartComponent({sortedTransactions}){
    if(item!=null){
        let data=sortedTransactions.map((item)=>{
            return {date:item.date ,amount:item.amount};
        });
    }
    // let data=sortedTransactions.map((item)=>{
    //     return {date:item.date ,amount:item.amount};
    // });
    
      const spendingData=sortedTransactions.filter((transaction)=>{
        if(transaction.type=="expense"){
            return {tag:transaction.tag,amount:transaction.amount};
        }
    });
        const config = {
          data,
          autoFit:true,
          xField: 'date',
          yField: 'amount',
        //   point:{
        //     size:5,
        //     shape:"diamond",
        //   },
        //   label:{
        //     style:{
        //         fill:"#aaa",
        //     }
        //   }
        };
        const spendingConfig = {
          spendingData,
          width:500,
          angleField:"amount",
          colorField:"tag",
          
        //   point:{
        //     size:5,
        //     shape:"diamond",
        //   },
        //   label:{
        //     style:{
        //         fill:"#aaa",
        //     }
        //   }
        };
        let chart;
        let pieChart;
        return (
            <div className="charts-wrapper">
                <h2>Your Analytics</h2>
           <Line style={{width:"50%"}} {...config} onReady={(chartInstance)=>(chart=chartInstance)}/>
            <div>
                <h2>Your Spending</h2>
                <Pie {...spendingConfig}
                 onReady={(chartInstance)=>(pieChart=chartInstance)}/>
            </div>
            </div>
        );
    
}
export default ChartComponent;*/

/*import React from "react";
import { Line } from "@ant-design/charts";
import { Pie } from "@ant-design/charts";

function ChartComponent({ sortedTransactions }) {
  // Map sortedTransactions to get line chart data
  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  // Filter sortedTransactions to get pie chart data
  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  const lineConfig = {
    data,
    autoFit: true,
    xField: 'date',
    yField: 'amount',
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  const pieConfig = {
    data: spendingData,
    width: 500,
    angleField: "amount",
    colorField: "tag",
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
  };

  return (
    <div className="charts-wrapper">
      <h2>Your Analytics</h2>
      <Line style={{ width: "50%" }} {...lineConfig} />
      <div>
        <h2>Your Spending</h2>
        <Pie {...pieConfig} />
      </div>
    </div>
  );
}

export default ChartComponent;*/


import React from "react";
import { Line, Pie } from "@ant-design/charts";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  const lineConfig = {
    data,
    autoFit: true,
    xField: 'date',
    yField: 'amount',
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  const pieConfig = {
    data: spendingData,
    angleField: "amount",
    colorField: "tag",
    label: {
    //   type: 'outer',
      content: '{name} {percentage}',
    },
  };

  return (
    <div className="charts-wrapper">
      <h2>Your Analytics</h2>
      <Line style={{ width: "50%" }} {...lineConfig} />
      <div>
        <h2>Your Spending</h2>
        <Pie {...pieConfig} />
      </div>
    </div>
  );
}

export default ChartComponent;
