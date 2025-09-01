import { useContext, useState } from 'react';
import type { User } from '../types.d';
import { formatBTC, formatCurrency } from '../utils/conversionUtils';
import { UsersContext } from '../contexts/UsersContext';
import { useConversion } from '../hooks/useConversion';
import { UserService } from '../services/userService';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import DeleteModal from './DeleteModal';

interface DataTableProps {
  selectedCurrency?: string;
  onEditUser?: (user: User) => void;
}

export default function DataTable({ 
  selectedCurrency = 'BRL',
  onEditUser 
}: DataTableProps) {
  const { 
    users, 
    total, 
    totalPages,
    loading, 
    page, 
    setPage, 
    refetch 
  } = useContext(UsersContext)!;

  const { rate: conversionRate } = useConversion('BTC', selectedCurrency);

  const safeUsers = Array.isArray(users) ? users : [];

  // Estado para controlar a modal de delete
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    userId: string;
  }>({
    isOpen: false,
    userId: ''
  });

  // Classes reutilizáveis para os botões de ação
  const actionButtonClasses = "btn-text btn-sm relative group p-1 rounded-full transition-colors duration-200 cursor-pointer";
  const actionIconClasses = "w-4 h-4 text-text-primary";
  const tooltipClasses = "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-xs text-white bg-[#3b3b3b]/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50";
  const tooltipArrowClasses = "absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#3b3b3b]/80";

  // Classes para células da tabela
  const tableCellClasses = "px-4 pt-3 pb-1 whitespace-nowrap text-xs text-text-secondary";
  const tableHeaderClasses = "px-4 py-3 text-sm font-bold text-text-primary tracking-wider";

  // Funções CRUD internas
  const handleEdit = (user: User) => {
    if (onEditUser) {
      onEditUser(user);
    }
  };

  const openDeleteModal = (user: User) => {
    setDeleteModal({
      isOpen: true,
      userId: user.id
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      userId: ''
    });
  };

  const handleDelete = async () => {
    try {
      await UserService.deleteUser(deleteModal.userId);
      refetch();
      closeDeleteModal();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário');
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Tabela */}
      <div className="bg-white overflow-hidden">
        <div className="flex items-center justify-between p-1">
          <h3 className="text-lg font-bold text-text-primary">
            Carteiras
          </h3>
          <Button variant="outline" size="md">
            Exportar CSV
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner 
              size="md" 
              text="Carregando usuários..." 
            />
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-[#d9d9d9]">
                  <th className={`${tableHeaderClasses} text-left`}>
                    Nome
                  </th>
                  <th className={`${tableHeaderClasses} text-left`}>
                    Sobrenome
                  </th>
                  <th className={`${tableHeaderClasses} text-left`}>
                    Email
                  </th>
                  <th className={`${tableHeaderClasses} text-left`}>
                    Bitcoin
                  </th>
                </tr>
              </thead>
              <tbody>
                {safeUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-text-secondary">
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                ) : (
                  safeUsers.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`border-l-2 border-l-transparent hover:border-l-primary hover:bg-[#FAFDFF] ${
                        index % 2 === 0 
                          ? 'bg-white' 
                          : 'bg-background'
                      }`}
                    >
                      <td className={`${tableCellClasses} text-left`}>
                         {user.nome}
                       </td>
                       <td className={`${tableCellClasses} text-left`}>
                         {user.sobrenome}
                       </td>
                       <td className={`${tableCellClasses} text-left`}>
                         {user.email}
                       </td>
                      <td className={`${tableCellClasses} text-left`}>
                          <div className="flex flex-col">
                            <span>{formatBTC(user.valor_carteira)}</span>
                            {conversionRate > 0 && (
                              <span className="text-xs text-green-600 font-medium">
                                {formatCurrency(user.valor_carteira * conversionRate, selectedCurrency)}
                              </span>
                            )}
                          </div>
                      </td>
                      <td className={`${tableCellClasses} text-right pr-3`}>
                        <div className="flex items-center space-x-1 justify-end">
                          <button
                             onClick={() => handleEdit(user)}
                             className={actionButtonClasses}
                           >
                              <svg className={actionIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              <div className={tooltipClasses}>
                              Editar
                              <div className={tooltipArrowClasses}></div>
                              </div>
                          </button>
                          <button
                             onClick={() => openDeleteModal(user)}
                             className={actionButtonClasses}
                           >
                            <svg className={actionIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <div className={tooltipClasses}>
                              Apagar
                              <div className={tooltipArrowClasses}></div>
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
      />

      {/* Modal de confirmação de delete */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
}
