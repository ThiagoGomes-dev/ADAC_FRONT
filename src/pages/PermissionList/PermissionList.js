import React, { useState } from 'react';
import Table from '../../components/Table/table';
import { Pagination } from 'react-bootstrap';
import './PermissionList.css';

const availablePermissions = [
  { id: 1, name: 'Visualizar Usuários', description: 'Permite visualizar dados dos usuários' },
  { id: 2, name: 'Editar Usuários', description: 'Permite editar dados dos usuários' },
  { id: 3, name: 'Excluir Usuários', description: 'Permite excluir usuários do sistema' },
  { id: 4, name: 'Gerenciar Perfis', description: 'Permite criar e editar perfis de usuários' },
  { id: 5, name: 'Visualizar Relatórios', description: 'Permite visualizar relatórios financeiros e operacionais' },
  { id: 6, name: 'Configurações Avançadas', description: 'Permite acessar configurações avançadas do sistema' },
];

function PermissionList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(14);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = availablePermissions.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(availablePermissions.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Colunas da tabela
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Permissão' },
    { key: 'description', title: 'Descrição' },
  ];

  return (
    <div className="permission-list-container">
      <h2>Listagem de Permissões</h2>

      {/* Usando o componente Table.js para exibir as permissões */}
      <Table columns={columns} data={currentRows} />

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
    </div>
  );
}

export default PermissionList;
