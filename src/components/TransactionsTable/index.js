// import React from "react";
// import{ Select, Table }from"antd";
// import { useState } from "react";
// // import { Option } from "antd/es/mentions";

// function TransactionsTable({transactions}){
//   const {Option}=Select;
//     const[search,setSearch]=useState("");
//     const[typeFilter,setTypeFilter]=useState("");
//     const columns = [
//         {
//           title: 'Name',
//           dataIndex: 'name',
//           key: 'name',
//         },
//         {
//           title: 'Amount',
//           dataIndex: 'amount',
//           key: 'amount',
//         },
//         {
//           title: 'Tag',
//           dataIndex: 'tag',
//           key: 'tag',
//         },
//         {
//           title: 'Date',
//           dataIndex: 'date',
//           key: 'date',
//         },
//         {
//           title: 'Type',
//           dataIndex: 'type',
//           key: 'type',
//         },
//       ];
//       let filteredTransactions=transactions.filter((item)=>
//       item.name.toLowerCase().includes(search.toLocaleLowerCase()) && item.type.includes(typeFilter)
//     );
      
//       return (
//         <>
//         <input value={search}
//         onChange={(e)=>setSearch(e.target.value)}
//         placeholder="Search by name"/>
//         <Select className="select-input" onChange={(value)=>setTypeFilter(value)}
//         value={typeFilter}
//         placeholder="Filter"
//         allowClear>
//           <Option value="">All</Option>
//           <Option value="income">Income</Option>
//           <Option value="expense">Expense</Option>
//         </Select>
//       <Table dataSource={transactions} columns={columns} />
//       </>
//     );

// }
// export default TransactionsTable;



// import { Select, Table, Input } from "antd";
// import Radio from "antd/es/radio/radio";
// import searchImg from "../../assets/search.svg"
// import React, { useRef, useState } from "react";
// import { SearchOutlined } from "@ant-design/icons";
// import search from "../assets/search.svg";
// import { parse } from "papaparse";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// const { Search } = Input;
// const { Option } = Select;


// function TransactionsTable({ transactions }) {
//   const { Option } = Select;
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [sortKey,setSortKey]=useState("");

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//     },
//     {
//       title: 'Tag',
//       dataIndex: 'tag',
//       key: 'tag',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//   ];

//   const filteredTransactions = transactions.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase()) && 
//     (typeFilter ? item.type.includes(typeFilter) : true)
//   );
//   const sortedTransactions = [...filteredTransactions].sort((a, b) => {
//     if (sortKey === "date") {
//       return new Date(a.date) - new Date(b.date);
//     } else if (sortKey === "amount") {
//       return a.amount - b.amount;
//     } else {
//       return 0;
//     }
//   });
//   function exportToCsv(){
//     var csv=unparse({
//       fields:["name","type","tag","date","amount"],
//       transactions,
//     });
//     const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download="transactions.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

//   function importFromCsv(event) {
//     event.preventDefault();
//     try {
//       parse(event.target.files[0], {
//         header: true,
//         complete: async function (results) {
//           // Now results.data is an array of objects representing your CSV rows
//           for (const transaction of results.data) {
//             // Write each transaction to Firebase, you can use the addTransaction function here
//             console.log("Transactions", transaction);
//             const newTransaction = {
//               ...transaction,
//               amount: parseInt(transaction.amount),
//             };
//             await addTransaction(newTransaction, true);
//           }
//         },
//       });
//       toast.success("All Transactions Added");
//       fetchTransactions();
//       event.target.files = null;
//     } catch (e) {
//       toast.error(e.message);
//     }
//   }


//   return (
//     <>
//       <div
//       style={{
//         width: "100%",
//         padding: "0rem 2rem",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           gap: "1rem",
//           alignItems: "center",
//           marginBottom: "1rem",
//         }}
//       >
//       <div className="input-flex">
//           <img src={searchImg} width="16" />
//           <input
//             placeholder="Search by Name"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//       <Select
//         className="select-input"
//         onChange={(value) => setTypeFilter(value)}
//         value={typeFilter}
//         placeholder="Filter"
//         allowClear
//         style={{ marginBottom: 16, width: 200 }}
//       >
//         <Option value="">All</Option>
//         <Option value="income">Income</Option>
//         <Option value="expense">Expense</Option>
//       </Select>
//       </div>
//       <div>
//       <Radio.Group
//             className="input-radio"
//             onChange={(e) => setSortKey(e.target.value)}
//             value={sortKey}
//           >
//             <Radio.Button value="">No Sort</Radio.Button>
//             <Radio.Button value="date">Sort by Date</Radio.Button>
//             <Radio.Button value="amount">Sort by Amount</Radio.Button>
//           </Radio.Group>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "1rem",
//               width: "400px",
//             }}
//           >
//             <button className="btn" onClick={exportToCsv}>
//               Export to CSV
//             </button>
//             <label for="file-csv" className="btn btn-blue">
//               Import from CSV
//             </label>
//             <input
//               onChange={importFromCsv}
//               id="file-csv"
//               type="file"
//               accept=".csv"
//               required
//               style={{ display: "none" }}
//             />
//           </div>
//           </div>
          
//       <Table dataSource={sortedTransactions} columns={columns} rowKey="id" />
//       </div>
//     </>
//   );
// }

// export default TransactionsTable;



// import { Select, Table, Input, Radio } from "antd";
// import searchImg from "../../assets/search.svg";
// import React, { useState } from "react";
// import { parse, unparse } from "papaparse";
// import { toast } from "react-toastify";

// const { Option } = Select;

// function TransactionsTable({ transactions, addTransaction, fetchTransactions }) {
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [sortKey, setSortKey] = useState("");

//   const columns = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Amount', dataIndex: 'amount', key: 'amount' },
//     { title: 'Tag', dataIndex: 'tag', key: 'tag' },
//     { title: 'Date', dataIndex: 'date', key: 'date' },
//     { title: 'Type', dataIndex: 'type', key: 'type' },
//   ];

//   const filteredTransactions = transactions.filter(item =>
//     item.name && item.name.toLowerCase().includes(search.toLowerCase()) &&
//     (typeFilter ? item.type.includes(typeFilter) : true)
//   );

//   const sortedTransactions = [...filteredTransactions].sort((a, b) => {
//     if (sortKey === "date") {
//       return new Date(a.date) - new Date(b.date);
//     } else if (sortKey === "amount") {
//       return a.amount - b.amount;
//     }
//     return 0;
//   });

//   function exportToCsv() {
//     const csv = unparse(transactions);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = "transactions.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

//   function importFromCsv(event) {
//     event.preventDefault();
//     try {
//       parse(event.target.files[0], {
//         header: true,
//         complete: async function (results) {
//           for (const transaction of results.data) {
//             const newTransaction = {
//               ...transaction,
//               amount: parseInt(transaction.amount, 10),
//             };
//             // await addTransaction(newTransaction, true);
//              addTransaction(newTransaction);
//           }
//           toast.success("All Transactions Added");
//           fetchTransactions();
//         },
//       });
//       event.target.files = null; // Clear the input
//     } catch (e) {
//       toast.error(e.message);
//     }
//   }

//   return (
//     <div style={{ width: "100%", padding: "0rem 2rem" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
//         <div className="input-flex">
//           <img src={searchImg} width="16" alt="search" />
//           <Input
//             placeholder="Search by Name"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <Select
//           className="select-input"
//           onChange={(value) => setTypeFilter(value)}
//           value={typeFilter}
//           placeholder="Filter"
//           allowClear
//           style={{ marginBottom: 16, width: 200 }}
//         >
//           <Option value="">All</Option>
//           <Option value="income">Income</Option>
//           <Option value="expense">Expense</Option>
//         </Select>
//       </div>

//       <div>
//         <Radio.Group
//           className="input-radio"
//           onChange={(e) => setSortKey(e.target.value)}
//           value={sortKey}
//         >
//           <Radio.Button value="">No Sort</Radio.Button>
//           <Radio.Button value="date">Sort by Date</Radio.Button>
//           <Radio.Button value="amount">Sort by Amount</Radio.Button>
//         </Radio.Group>

//         <div style={{ display: "flex", justifyContent: "center", gap: "1rem", width: "400px" }}>
//           <button className="btn" onClick={exportToCsv}>Export to CSV</button>
//           <label htmlFor="file-csv" className="btn btn-blue">Import from CSV</label>
//           <input
//             onChange={importFromCsv}
//             id="file-csv"
//             type="file"
//             accept=".csv"
//             required
//             style={{ display: "none" }}
//           />
//         </div>
//       </div>

//       <Table dataSource={sortedTransactions} columns={columns} rowKey="id" />
//     </div>
//   );
// }

// export default TransactionsTable;



import { Select, Table, Input, Radio } from "antd";
import searchImg from "../../assets/search.svg";
import React, { useState } from "react";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const { Option } = Select;

function TransactionsTable({ transactions, addTransaction, fetchTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Tag', dataIndex: 'tag', key: 'tag' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
  ];

  const filteredTransactions = transactions.filter(item =>
    item.name && item.name.toLowerCase().includes(search.toLowerCase()) &&
    (typeFilter ? item.type.includes(typeFilter) : true)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    }
    return 0;
  });

  function exportToCsv() {
    const csv = unparse(transactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const amount = parseFloat(transaction.amount);
            if (!isNaN(amount)) {
              const newTransaction = {
                ...transaction,
                amount: amount,
              };
              addTransaction(newTransaction, true);
            }
          }
          toast.success("All Transactions Added");
          fetchTransactions();
        },
      });
      event.target.files = null; // Clear the input
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div style={{ width: "100%", padding: "0rem 2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <div className="input-flex">
          <img src={searchImg} width="16" alt="search" />
          <Input
            placeholder="Search by Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
          style={{ marginBottom: 16, width: 200 }}
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", width: "400px" }}>
          <button className="btn" onClick={exportToCsv}>Export to CSV</button>
          <label htmlFor="file-csv" className="btn btn-blue">Import from CSV</label>
          <input
            onChange={importFromCsv}
            id="file-csv"
            type="file"
            accept=".csv"
            required
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table dataSource={sortedTransactions} columns={columns} rowKey="id" />
    </div>
  );
}

export default TransactionsTable;
