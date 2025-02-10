import React, { useState } from 'react';
import { Modal, Button, Form, Pagination } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Table from '../../components/Table/table';
import Select from 'react-select';
import './ProfileList.css';

const rows = [
  { id: 1, name: 'Admin', description: 'Administrador', permissions: ['Visualizar Usuários', 'Editar Usuários', 'Excluir Usuários'] },
  { id: 2, name: 'Sub-Admin', description: 'Sub administrador', permissions: ['Visualizar Usuários', 'Editar Usuários'] },
  { id: 3, name: 'Editor', description: 'Editor de conteúdo', permissions: ['Visualizar Usuários'] },
  { id: 4, name: 'Usuário Comum', description: 'Usuário Comun', permissions: ['Padrão'] },
];

const availablePermissions = [
  { value: 'Visualizar Usuários', label: 'Visualizar Usuários' },
  { value: 'Editar Usuários', label: 'Editar Usuários' },
  { value: 'Excluir Usuários', label: 'Excluir Usuários' },
  { value: 'Gerenciar Perfis', label: 'Gerenciar Perfis' },
  { value: 'Visualizar Relatórios', label: 'Visualizar Relatórios' },
  { value: 'Configurações Avançadas', label: 'Configurações Avançadas' },
];

function ProfileList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(14);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({ id: '', name: '', description: '', permissions: [] });

  const handleAdd = () => {
    alert(`Novo perfil ${currentProfile.name} adicionado!`);
    setOpenAddModal(false);
  };

  const handleSave = () => {
    alert(`Dados do perfil com ID ${currentProfile.id} atualizados!`);
    setOpenEditModal(false);
  };

  const handleDelete = () => {
    alert(`Excluindo perfil com ID: ${currentProfile.id}`);
    setOpenDeleteModal(false);
  };

  const handleMenuClick = (profile, action) => {
    setCurrentProfile(profile);
    if (action === 'edit') {
      setOpenEditModal(true); 
    } else if (action === 'delete') {
      setOpenDeleteModal(true); 
    }
  };

  const handlePermissionChange = (selectedOptions) => {
    setCurrentProfile({
      ...currentProfile,
      permissions: selectedOptions ? selectedOptions.map(option => option.value) : [],
    });
  };

  // Obter itens da página atual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Colunas da tabela
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Nome' },
    { key: 'description', title: 'Descrição' },
    { key: 'permissions', title: 'Permissões' },
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

  return (
    <div className="profile-list-container">
      <h2>Gerenciar Perfis</h2>
      <div className="custom-container">
        <input type="text" placeholder="Procurar Perfis" className="search-input" />
        <Button className="btn-cadastrar" onClick={() => setOpenAddModal(true)}>Adicionar Perfil</Button>
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

      {/* Modal de adicionar perfil */}
      <Modal show={openAddModal} onHide={() => setOpenAddModal(false)} className="profile-list-modal">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={currentProfile.name}
                onChange={(e) => setCurrentProfile({ ...currentProfile, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição"
                value={currentProfile.description}
                onChange={(e) => setCurrentProfile({ ...currentProfile, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPermissions">
              <Form.Label>Permissões</Form.Label>
              <Select
                isMulti
                options={availablePermissions}
                value={availablePermissions.filter(permission => currentProfile.permissions.includes(permission.value))}
                onChange={handlePermissionChange}
                closeMenuOnSelect={false}
                placeholder="Selecione as permissões"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancelar-btn" onClick={() => setOpenAddModal(false)}>
            Cancelar
          </Button>
          <Button className="confirmar-btn" onClick={handleAdd}>
            Adicionar Perfil
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edição */}
      <Modal show={openEditModal} onHide={() => setOpenEditModal(false)} className="profile-list-modal">
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={currentProfile.name}
                onChange={(e) => setCurrentProfile({ ...currentProfile, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição"
                value={currentProfile.description}
                onChange={(e) => setCurrentProfile({ ...currentProfile, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPermissions">
              <Form.Label>Permissões</Form.Label>
              <Select
                isMulti
                options={availablePermissions}
                value={availablePermissions.filter(permission => currentProfile.permissions.includes(permission.value))}
                onChange={handlePermissionChange}
                closeMenuOnSelect={false}
                placeholder="Selecione as permissões"
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
      <Modal show={openDeleteModal} onHide={() => setOpenDeleteModal(false)} className="profile-list-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir o perfil {currentProfile.name}?</p>
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

export default ProfileList;
