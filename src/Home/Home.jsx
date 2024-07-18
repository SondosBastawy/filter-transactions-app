import React, { useState } from 'react'
import MainTable from '../MainTable/MainTable'
import TransactionsGraph from '../TRansactionGraph/TransactionsGraph'

export default function Home() {
const [filteredTransactions, setFilteredTransactions] = useState({});
  return (
    <>
    <div className="container-fluid h-100vh py-4 bg-light-subtle ">
    <h1 className='text-center'>welcome to our new filtration web site</h1>
    <MainTable setFilteredTransactions={setFilteredTransactions}/>
    <TransactionsGraph selectedCustomer ={filteredTransactions}/>
    </div>
    </>
  )
}
