import React, { useState, useEffect }  from "react";
import "./MainTable.css";
import axios from "axios";

export default function MainTable({  setFilteredTransactions }) {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [customerNameFilter, setCustomerNameFilter] = useState('');
  const [transactionAmountFilter, setTransactionAmountFilter] = useState(null);
  // const [customerNameSelected, setCustomerNameSelected] = useState('');

  async function fetchData(){
    const transactionsData =await axios.get('http://localhost:5000/transactions'); 
    const customersData =await axios.get('http://localhost:5000/customers');


    setCustomers(customersData.data.map((item => {
      const obj = {
       ...item,
       transactions: transactionsData.data.filter((transaction => {
          return transaction.customer_id === parseInt(item.id)
        }))
      }
      return obj
    })));
    setTransactions(transactionsData.data);
    // setFilteredTransactions(transactions); 
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransactionAmountChange = (e) => {
    const amount = parseInt(e.target.value);
    if (isNaN(amount)) {
      setTransactionAmountFilter(null);
    } else {
      setTransactionAmountFilter(amount);
      // setFilteredTransactions(filtered);
    }
  };

  function updateSelected(item) {
    const  user = customers.find((obj) => obj.id === item.id )
    setFilteredTransactions(user)
    
   }
  return (
    <>
    <div className="shadow-lg ">
      <div className="d-flex justify-content-around align-content-center py-3 ">
      <input 
        className="form-control w-25"
        type="text"
        value={customerNameFilter}
        onChange={(e)=>{setCustomerNameFilter(e.target.value)}}
        placeholder="Filter by customer name"
      />
      <input
        className="form-control w-25" 
        type="number"
        value={transactionAmountFilter}
        onChange={handleTransactionAmountChange}
        placeholder="Filter by transaction amount"
      />
      </div>
      <div className="MainTable rounded-3 m-4">
        <table className="table table-columns  MainTable rounded-3 table-success ">
          <thead className=" w-100 rounded-3">
            <tr className="">
              <th scope="col"> CustomerId</th>
              <th scope="col">Name</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
        {customers.filter((item => {
          item.filteredTransactions = item.transactions;
          if(transactionAmountFilter) {
            item.filteredTransactions = item.transactions.filter((obj) => {
                return obj.amount === transactionAmountFilter
            })
            return item.filteredTransactions?.length > 0
          }
          if(customerNameFilter) {
            return item.name.toLowerCase().includes(customerNameFilter)
          }
          return item
        })).map((item) => {
          return (
           <tr className="Rows cursor-pointer" key={item.id} onClick={()=>updateSelected(item)}  >
             <td key={item.id}>#{item.id}</td>
             <td className="cursor-pointer" >
                {item?.name}
              </td>
             <td>
               {
               item.filteredTransactions.map((transaction) => (
                 <p key={transaction.id}>{transaction.date}</p>
               ))
               }
               
             </td>
             <td>
               { 
               item.filteredTransactions.map((transaction) => (
                 <p key={transaction.id}>{transaction.amount}</p>
               ))
               }
               
             </td>
           </tr>
         );
       })
        
        
        
        }   
          </tbody>
        </table>
      </div>

    </div>

    </>
  );
}
