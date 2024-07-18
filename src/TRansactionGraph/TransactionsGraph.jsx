// App.js
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

  function TransactionsGraph  ({ selectedCustomer }) {
    console.log(selectedCustomer)
    const [graphData, setGraphData] = useState({});
    const [total, setTotal] = useState({});
    
    useEffect(() => {
      if(selectedCustomer.id) {
        const { transactions } = selectedCustomer;
        const dailyTotals = transactions.reduce((acc, transactions) => {
          const date = transactions.date;
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += transactions.amount;
          return acc;
        }, {});

        setGraphData( Object.keys(dailyTotals).map((date) => ({
          date,
          amount: dailyTotals[date],
        })));

      }      
       
    }, [selectedCustomer])
    return (
      <div className="transaction w-100 h-100 d-flex justify-content-center align-content-center flex-column pt-3 shadow-lg mt-1 p-5">

        <h2 className="text-center py-1">Total amount transactions{} for <p className="text-primary">{selectedCustomer.name} </p></h2>
        <ResponsiveContainer width="80%" height={400} aspect={3}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#0ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default TransactionsGraph;
  


