import React from 'react';
import './table.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Visibility } from '@mui/icons-material'; // Ícone de olho

function Table({ columns, data = [], handleMenuClick }) { // Valor padrão para data
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="table-header">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.key === 'actions' ? (
                      <div className="action-icons">
                        <button className="icons-view" onClick={() => handleMenuClick(row, 'view')}>
                          <Visibility />
                        </button>
                        <button className="icons-edit" onClick={() => handleMenuClick(row, 'edit')}>
                          <FaEdit />
                        </button>
                        <button className="icons-delete" onClick={() => handleMenuClick(row, 'delete')}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    ) : (
                      column.render ? column.render(row[column.key], row) : row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="table-cell">
                Nenhum dado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
