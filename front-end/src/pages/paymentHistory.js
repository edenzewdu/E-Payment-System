import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Modal } from "antd";
import  './payment.css';
import  Header  from "./Header.js";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    // Fetch payment history from local storage
    const storedPaymentHistory = JSON.parse(localStorage.getItem("paymentHistorys")) || [];
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

  return (
    <div >
      <Header/>
      <h1 style={{padding:'10% 0% 0% 2%'}}>Payment History</h1>
      {paymentHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Transaction No</th>
              <th>Payment Method</th>
              <th>Description</th>
              <th>Reference Number</th>
              <th>Total Amount</th>
              <th>Payment Date</th>
              <th>Payer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id} id={`payment-row-${payment.id}`}>
                <td>{payment.id}</td>
                <td>{payment.TransactionNo}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.paymentDescription}</td>
                <td>{payment.ReferenceNo}</td>
                <td>{payment.amount}</td>
                <td>{payment.paymentDate}</td>
                <td>{payment.payerId}</td>
                <td>
                  <button onClick={() => generatePicture(payment)}>Generate Picture</button>
                  <button onClick={() => generatePDF(payment)}>Generate PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <button key="pdf" onClick={() => handleDownload("pdf")}>
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