// Modal.js

import React from 'react';
import { Modal } from 'react-bootstrap'; // Importing necessary Bootstrap components

const CustomModal = ({ show, onHide, title, tableData }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped">
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <th>{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
