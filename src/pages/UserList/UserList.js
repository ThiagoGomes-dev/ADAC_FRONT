import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Modal, Box, Alert, Pagination, Switch } from '@mui/material';
import { Add } from '@mui/icons-material';
import './UserList.css';
import AutoLayout from '../../components/AutoLayout/AutoLayout';
import Table from '../../components/Table/table'; // Importação do Table
import { fetchUsers, deleteUser, activateUser, deactivateUser } from '../../services/api'; // Funções da API para buscar e excluir usuários

function UserList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página inicial para backend (0-indexed)
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Termo de pesquisa
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [toggleUser, setToggleUser] = useState(null);

  // Busca usuários ao carregar ou ao mudar de página
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers(currentPage);
        setRows(
          data.users.map((user) => ({
            ...user,
            status: user.statusName, // Mapeie o campo correto do backend para o frontend
          }))
        );
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
  
    loadUsers();
  }, [currentPage]);

  const confirmToggleStatus = async () => {
    if (toggleUser) {
      try {
        if (toggleUser.status === 'ATIVO') {
          await deactivateUser(toggleUser.id);
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === toggleUser.id ? { ...row, status: 'INATIVO' } : row
            )
          );
        } else {
          await activateUser(toggleUser.id);
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === toggleUser.id ? { ...row, status: 'ATIVO' } : row
            )
          );
        }
  
        setSuccessMessage(
          `Usuário ${toggleUser.name} foi ${
            toggleUser.status === 'ATIVO' ? 'desativado' : 'ativado'
          } com sucesso.`
        );
        setTimeout(() => setSuccessMessage(''), 3000); // Remove o alerta após 3 segundos
      } catch (error) {
        console.error('Erro ao alterar status do usuário:', error.message);
      } finally {
        setToggleModalOpen(false);
      }
    }
  };
  
  

  const closeToggleModal = () => {
    setToggleModalOpen(false);
  };

  // Confirmação de exclusão
  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.id); // Chamada ao endpoint de exclusão
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedUser.id));
        setSuccessMessage(`Usuário ${selectedUser.name} excluído com sucesso.`);
        setTimeout(() => setSuccessMessage(''), 3000); // Remove o alerta após 3 segundos
      } catch (error) {
        console.error('Erro ao excluir usuário:', error.message);
      } finally {
        setOpenModal(false);
      }
    }
  };

  // Abre o modal de exclusão
  const handleMenuClick = (row, action) => {
    if (action === 'view') {
      navigate(`/usuarios/visualizar/${row.id}`);
    } else if (action === 'edit') {
      navigate(`/usuarios/editar/${row.id}`);
    } else if (action === 'delete') {
      setSelectedUser(row);
      setOpenModal(true);
    }
  };
  

  // Fechar modal
  const closeModal = () => {
    setOpenModal(false);
  };

  // Colunas da tabela
  const columns = [
    { key: 'name', title: 'Nome' },
    { key: 'email', title: 'Email' },
    {
      key: 'status',
      title: 'Status',
      render: (status, row) => (
        <Switch
          checked={status === 'ATIVO'}
          onChange={() => {
            if (!toggleModalOpen) {
              setToggleUser({ id: row.id, name: row.name, status });
              setToggleModalOpen(true);
            }
          }}
          disabled={toggleModalOpen} // Evita interações enquanto o modal estiver aberto
          color="primary"
        />
      ),
    },
    { key: 'actions', title: 'Ações' },
  ];

  return (
    <AutoLayout>
      <div className="user-list-container">
        <div className="header-container">
          <Typography variant="h4" className="title">
            Gerenciar Usuários
          </Typography>
        </div>

        <div className="container-search">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Buscar por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <Button
            variant="contained"
            startIcon={<Add />}
            color="primary"
            onClick={() => navigate('/usuarios/criar')}
            className="create-button"
          >
            Criar Usuário
          </Button>
        </div>

        {successMessage && <Alert severity="success" className="alert">{successMessage}</Alert>}

        {loading ? (
          <Typography variant="body1">Carregando usuários...</Typography>
        ) : (
          <>
            <Table
              columns={columns}
              data={rows}
              handleMenuClick={handleMenuClick}
            />

            <Box display="flex" justifyContent="center" marginTop={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}

        <Modal open={openModal} onClose={closeModal} aria-labelledby="delete-confirmation">
          <Box className="modal-box">
            <Typography id="delete-confirmation" variant="h6">
              Deseja excluir o usuário {selectedUser?.name}?
            </Typography>
            <Box className="modal-actions">
              <Button variant="outlined" onClick={closeModal} color="secondary">
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleDelete} color="primary">
                Confirmar
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={toggleModalOpen} onClose={closeToggleModal} aria-labelledby="toggle-confirmation">
          <Box className="modal-box">
            <Typography id="toggle-confirmation" variant="h6">
              Deseja {toggleUser?.status === 'ATIVO' ? 'desativar' : 'ativar'} o usuário {toggleUser?.name}?
            </Typography>
            <Box className="modal-actions">
              <Button variant="outlined" onClick={closeToggleModal} color="secondary">
                Cancelar
              </Button>
              <Button variant="contained" onClick={confirmToggleStatus} color="primary">
                Confirmar
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </AutoLayout>
  );
}

export default UserList;
