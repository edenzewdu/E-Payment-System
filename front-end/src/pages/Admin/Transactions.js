import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';
import Dashboard from './Dashboard';

const PaymentList = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(['9']);

  useEffect(() => {
      localStorage.setItem("selectedMenu", selectedMenu);
    fetchPayments();
  }, [selectedMenu]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/payment');
      setPaymentData(response.data);
    } catch (error) {
      message.error('Failed to fetch payments.');
    }
  };

  const columns = [
    {
      title: 'Transaction No',
      dataIndex: 'TransactionNo',
      key: 'TransactionNo',
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payer ID',
      dataIndex: 'payerID',
      key: 'payerID',
    },
    {
      title: 'Payee ID',
      dataIndex: 'payeeID',
      key: 'payeeID',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Payment Description',
      dataIndex: 'paymentDescription',
      key: 'paymentDescription',
    },
    {
      title: 'Reference No',
      dataIndex: 'ReferenceNo',
      key: 'ReferenceNo',
    },
  ];

  return (<Dashboard content={
    <div>
      <h1>Payment List</h1>
      <Table dataSource={paymentData} columns={columns} scroll={{ x: true }} />
    </div>}/>
  );
};

export default PaymentList;