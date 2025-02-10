import React, { useState } from 'react';
import { Modal, Button, Form, Pagination } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Table from '../../components/Table/table';
import './CompanyList.css';

const rows = [
  { id: 1, cnpj: '12.345.678/0001-90', razaoSocial: 'Tech Solutions Ltda', email: 'techsolutions@exemplo.com' },
  { id: 2, cnpj: '98.765.432/0001-01', razaoSocial: 'Global Enterprises S.A.', email: 'globalenterprises@exemplo.com' },

];

function CompanyList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({ id: '', cnpj: '', razaoSocial: '', email: '' });

  const handleAdd = () => {
    alert(`Nova empresa ${currentCompany.razaoSocial} adicionada!`);
    setOpenAddModal(false);
  };

  const handleSave = () => {
    alert(`Dados da empresa com ID ${currentCompany.id} atualizados!`);
    setOpenEditModal(false);
  };

  const handleDelete = () => {
    alert(`Excluindo empresa com ID: ${currentCompany.id}`);
    setOpenDeleteModal(false);
  };

  const handleMenuClick = (company, action) => {
    setCurrentCompany(company);
    if (action === 'edit') {
      setOpenEditModal(true);
    } else if (action === 'delete') {
      setOpenDeleteModal(true);
    }
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'cnpj', title: 'CNPJ' },
    { key: 'razaoSocial', title: 'Razão Social' },
    { key: 'email', title: 'E-mail' },
    {
      key: 'actions',
      title: 'Ações',
      render: (column, row) => (
        <div className="action-icons">
          <Button className="icons-edit" onClick={() => handleMenuClick(row, 'edit')}>
            <FaEdit />
          </Button>
          <Button className="icons-delete" onClick={() => handleMenuClick(row, 'delete')}>
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="company-list-container">
      <h2>Gerenciar Empresas</h2>
      <div className="custom-container">
        <input type="text" placeholder="Procurar Empresas" className="search-input" />
        <Button className="btn-cadastrar" onClick={() => setOpenAddModal(true)}>
          Adicionar Empresa
        </Button>
      </div>

      {/* Componente Table.js */}
      <Table columns={columns} data={currentRows} handleMenuClick={handleMenuClick} />

      {/* Paginação */}
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>

      {/* Modal de adicionar empresa */}
      <Modal show={openAddModal} onHide={() => setOpenAddModal(false)} className='company-list-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCNPJ">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                placeholder="CNPJ"
                value={currentCompany.cnpj}
                onChange={(e) => setCurrentCompany({ ...currentCompany, cnpj: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formRazaoSocial">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razão Social"
                value={currentCompany.razaoSocial}
                onChange={(e) => setCurrentCompany({ ...currentCompany, razaoSocial: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-mail"
                value={currentCompany.email}
                onChange={(e) => setCurrentCompany({ ...currentCompany, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancelar-btn" onClick={() => setOpenAddModal(false)}>
            Cancelar
          </Button>
          <Button className="confirmar-btn" onClick={handleAdd}>
            Adicionar Empresa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edição */}
      <Modal show={openEditModal} onHide={() => setOpenEditModal(false)} className='company-list-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCNPJ">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                placeholder="CNPJ"
                value={currentCompany.cnpj}
                onChange={(e) => setCurrentCompany({ ...currentCompany, cnpj: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formRazaoSocial">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razão Social"
                value={currentCompany.razaoSocial}
                onChange={(e) => setCurrentCompany({ ...currentCompany, razaoSocial: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-mail"
                value={currentCompany.email}
                onChange={(e) => setCurrentCompany({ ...currentCompany, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancelar-btn" onClick={() => setOpenEditModal(false)}>
            Cancelar
          </Button>
          <Button className="confirmar-btn" onClick={handleSave}>
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de exclusão */}
      <Modal show={openDeleteModal} onHide={() => setOpenDeleteModal(false)} className='company-list-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir a empresa {currentCompany.razaoSocial}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancelar-btn" onClick={() => setOpenDeleteModal(false)}>
            Cancelar
          </Button>
          <Button className="confirmar-btn" onClick={handleDelete}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyList;
