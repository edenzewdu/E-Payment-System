import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import "./payment.css";
import { MailOutlined } from "@ant-design/icons";
import nodemailer from "nodemailer";


const Payment = () => {
  const [serviceNo, setServiceNumber] = useState(localStorage.getItem('serviceNo'));
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [userbill, setUserBill] = useState(null);
  const [banks, setBanks] = useState([]);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState();
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const formRef = useRef(null);
  const [verificationCode, setVerificationCode] = useState('');



  const [bankAccount, setBankAccount] = useState({
    bankAccountNumber: "",
    bankName: "", // Add the bankName field
    account_holder_name: "",
    account_holder_type: "individual",
  });

  const [showBankAccountForm, setShowBankAccountForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Users/serviceNo/${serviceNo}`);
        setUser(response.data);
        console.log(response.data);

        // Assuming user has a valid service provider association
        const serviceProviderBIN = response.data.ServiceProviders[0].serviceProviderBIN;
        const userId = response.data.id;
        setUserId(userId);
        console.log(serviceProviderBIN);

        const userBillResponse = await axios.get(`http://localhost:3000/bills/findOne`, {
          params: {
            userId: userId,
            serviceProviderBIN: serviceProviderBIN,
          }
        });
        setUserBill(userBillResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBanks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Agents"); // Replace with your actual endpoint
        setBanks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchBanks();
  }, []);

  const handlePayment = (billNumber, serviceProviderBIN) => {
    setShowBankAccountForm(true);
    // Handle the payment logic here
  };


  const handleChange = () => {
    console.log();
  };


  const sendVerificationEmail = async () => {
    // Generate a verification code
    const verificationCode = generateVerificationCode();

    // Send the verification code to the fetched email address
    const response = await fetch(`http://localhost:3000/Users/${userId}`);
    const userData = await response.json();

    // Extract the email address from the fetched user data
    const email = userData.Email;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "edenzewdu434@gmail.com",
        pass: "gyefcyzofjjpvheh",
      },
    });

    // Define the email message
    const mailOptions = {
      from: "edenzewdu434@gmail.com",
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
        // Do something when the email is successfully sent
      }
    });

    // Update the state or perform any other necessary actions
    setVerificationCode(verificationCode);
  };

  const handleDownload = (fileType) => {
    // Capture the modal container element
    const modalContainer = document.querySelector(".ant-modal-content");

    // Exclude the footer element from the captured canvas
    const footer = modalContainer.querySelector(".footer");
    const buttons = modalContainer.querySelectorAll(".ant-btn");

    // Hide the buttons temporarily
    buttons.forEach((button) => {
      button.style.display = "none";
    });

    if (footer) {
      footer.style.display = "none";
    }

    // Use html2canvas to convert the modal container to a canvas
    html2canvas(modalContainer).then((canvas) => {
      // Restore the display of the buttons and footer elements
      buttons.forEach((button) => {
        button.style.display = "block";
      });

      if (footer) {
        footer.style.display = "block";
      }

      if (fileType === "picture") {
        // Convert the canvas to a base64-encoded PNG image
        const dataURL = canvas.toDataURL("image/png");

        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "modal.png";
        link.click();
      } else if (fileType === "pdf") {
        // Convert the canvas to a base64-encoded PNG image
        const dataURL = canvas.toDataURL("image/png");

        // Calculate the dimensions of the PDF document based on the canvas size
        const imgWidth = 210; // A4 page width (in mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create a new jsPDF instance
        const pdf = new jsPDF("p", "mm", "a4");

        // Add the image to the PDF document
        pdf.addImage(dataURL, "PNG", 0, 0, imgWidth, imgHeight);

        // Save the PDF file
        pdf.save("modal.pdf");
      } else {
        console.error("Invalid file type");
      }
    });
  };

  const handleBankAccountSubmit = async () => {
    try {

      // Send verification email
      await sendVerificationEmail(userId);

      // Generate random transaction number and get current date
      const randomNumber = Math.floor(Math.random() * 1000000000);
      const random = `TXN${randomNumber}`;
      const today = new Date().toISOString().split('T')[0];

      // Prepare payment data
      const paymentData = {
        TransactionNo: random,
        paymentDate: today,
        amount: userbill.TotalAmount,
        UserId: userbill.UserId,
        serviceProviderBIN: localStorage.getItem('serviceProviderBIN'),
        paymentMethod: "Credit card", // Add your payment method
        paymentDescription: `Payment for ${userbill.serviceDescription} services`,
        ReferenceNo: userbill.billNumber,
      };

      // Create and verify the PaymentMethod
      const paymentMethodResponse = await axios.post(
        "http://localhost:3000/payment",
        paymentData
      );

      // Update the bill status to "paid"
      const response = await axios.put(`http://localhost:3000/bills/${userbill.id}`, {
        billStatus: "paid",
        PaymentId: paymentMethodResponse.data.id,
      });

      if (response) {
        // Payment succeeded
        console.log("Paid");
        message.success('Payment successful');
        setDownloadModalVisible(true);
        setPayments(paymentData);
        console.log(payments);

        const paymentHistory = JSON.parse(localStorage.getItem("paymentHistorys")) || [];
        paymentHistory.push(paymentData);
        localStorage.setItem("paymentHistorys", JSON.stringify(paymentHistory));
        console.log(localStorage.getItem('paymentHistory'))

      } else {
        // Payment failed
        console.log("Payment failed");
      }
    } catch (error) {
      console.error(error);
    }

  };

  const generateVerificationCode = () => {
    const length = 6; // Length of the verification code
    const characters = "0123456789"; // Characters to use for the code
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  };


  return (
    <div className="payment-container">
      <h1>Bill Detail</h1>

      {userbill ? (
        <div key={userbill.billNumber} className="bill-container">
          <div className="bill-header">
            <h2>Bill Number: {userbill.billNumber}</h2>
            <h3>Date Issued: {userbill.dateIssued}</h3>
          </div>
          <div className="bill-details">
            <div className="bill-section">
              <h4>Customer Information</h4>
              <p>Customer Name: {userbill.customerName}</p>
            </div>
            <div className="bill-section">
              <h4>Service Details</h4>
              <p>Description: {userbill.serviceDescription}</p>
              <p>Period: {userbill.servicePeriod}</p>
              <p>Charges: {userbill.serviceCharges}</p>
              <p>Additional Charges: {userbill.additionalCharges}</p>
            </div>
            <div className="bill-section">
              <h4>Payment Details</h4>
              <p>Amount Due: {userbill.amountDue}</p>
              <p>Due Date: {userbill.dueDate}</p>
              <p>Bill Status: {userbill.billStatus}</p>
              <p>Total Amount: {userbill.TotalAmount}</p>
            </div>
          </div>
          <Button
            className="pay-btn"
            onClick={() =>
              handlePayment(userbill.billNumber, userbill.serviceProviderBIN)
            }
          >
            Pay Now
          </Button>
        </div>
      ) : (
        <div className="no-bill">
          <h2>No bill available.</h2>
        </div>
      )}

      {showBankAccountForm && (
        <div className="input-container">
          <h2>Bank Account Details</h2>
          <Input
            className="shorter-input"
            name="bankAccountNumber"
            value={bankAccount.bankAccountNumber}
            onChange={handleChange}
            placeholder="Bank Account Number"
          />
          <select
            className="bank-dropdown"
            name="AgentName"
            value={bankAccount.AgentName}
            onChange={handleChange}
          >
            <option value="">Select Bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.agentName}>
                {bank.agentName}
              </option>
            ))}
          </select>
          <br />
          <Input
            className="verification-input"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code"
          />
          <Button
            className="verify-email-btn"
            icon={<MailOutlined />}
            onClick={sendVerificationEmail}
          >
            send Verification Email
          </Button>
          <br />


          <Button className="pay" onClick={handleBankAccountSubmit}>
            Pay
          </Button>
        </div>
      )}
      <Modal
        title="Bank Account Details"
        visible={downloadModalVisible}
        onCancel={() => setDownloadModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setDownloadModalVisible(false)}>
            Close
          </Button>,
          <Button key="picture" type="primary" onClick={() => handleDownload("picture")}>
            Download as Picture
          </Button>,
          <Button key="pdf" type="primary" onClick={() => handleDownload("pdf")}>
            Download as PDF
          </Button>
        ]}
      >


        {userbill && (
          <div className="payment-details">
            <h2>Payment Information:</h2>
            <p>TransactionNo: {payments.TransactionNo}</p>
            <p>Payment Method: Credit card</p>
            <p>
              Description: {payments.paymentDescription}
            </p>
            <p>
              Reference Number:  {payments.ReferenceNo}
            </p>
            <p>
              Total Amount:  {payments.amount}
            </p>
            <p>
              Payment Date:  {payments.paymentDate}
            </p>
            <p>
              Payer:  {payments.payerId}
            </p>
            <p> </p>
            <p>
              Payment Date:  {payments.paymentDate}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Payment;