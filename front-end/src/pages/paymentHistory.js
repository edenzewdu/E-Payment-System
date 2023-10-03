import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Modal, Table } from "antd";
import "./payment.css";
import Header from "./Header.js";
import { useNavigate } from "react-router-dom";


const PaymentHistory = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate("/users"); // Replace "/user" with the desired URL for the user page
      return;
    }
    // Fetch payment history from local storage
    console.log(userData.Payments);
    const storedPaymentHistory = userData.Payments;
    setPaymentHistory(storedPaymentHistory);
  }, []);

  const generatePicture = (payment) => {
    setSelectedPayment(payment);
    setModalVisible(true);
  };

  const generatePDF = (payment) => {
    setSelectedPayment(payment);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleDownload = (fileType) => {
    // Capture the modal container element
    const modalContainer = document.querySelector(".payment-details");

    // Exclude the buttons from the captured canvas
    const buttons = modalContainer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.display = "none";
    });

    // Use html2canvas to convert the modal container to a canvas
    html2canvas(modalContainer).then((canvas) => {
      // Restore the display of the buttons
      buttons.forEach((button) => {
        button.style.display = "block";
      });

      if (fileType === "picture") {
        // Convert the canvas to a base64-encoded PNG image
        const dataURL = canvas.toDataURL("image/png");

        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `payment-${selectedPayment.id}.png`;
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
        pdf.save(`payment-${selectedPayment.id}.pdf`);
      } else {
        console.error("Invalid file type");
      }
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Transaction No",
      dataIndex: "TransactionNo",
      key: "TransactionNo",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Description",
      dataIndex: "paymentDescription",
      key: "paymentDescription",
    },
    {
      title: "Reference Number",
      dataIndex: "ReferenceNo",
      key: "ReferenceNo",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Payer",
      dataIndex: "payerId",
      key: "payerId",
    },
    {
      title: "Action",
      key: "action",
      render: (text, payment) => (
        <span>
          <button onClick={() => generatePicture(payment)}>Generate Picture</button>
          <button onClick={() => generatePDF(payment)}>Generate PDF</button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <h1 style={{ padding: "170px 0% 0% 2%" }}>Payment History</h1>
      {paymentHistory.length > 0 ? (
        <Table dataSource={paymentHistory} columns={columns} scroll={{ x: true }} />
      ) : (
        <p>No payment history available.</p>
      )}

      <Modal
        title="Bank Information Details"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <button key="picture" onClick={() => handleDownload("picture")}>
            Generate Picture
          </button>,
          <button key="pdf" onClick={() =>handleDownload("pdf")}>
            Generate PDF
          </button>,
        ]}
      >
        {selectedPayment && (
          <div className="payment-details">
            <h2>Payment Information:</h2>
            <p>TransactionNo: {selectedPayment.TransactionNo}</p>
            <p>Payment Method: Credit card</p>
            <p>Description: {selectedPayment.paymentDescription}</p>
            <p>Reference Number: {selectedPayment.ReferenceNo}</p>
            <p>Total Amount: {selectedPayment.amount}</p>
            <p>Payment Date: {selectedPayment.paymentDate}</p>
            <p>Payer: {selectedPayment.payerId}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentHistory;