import { useState, useContext } from 'react';
import DataTable from '../components/DataTable';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import Button from '../components/Button';
import UserModal from '../components/UserModal';
import { UsersContext } from '../contexts/UsersContext';
import { UserService } from '../services/userService';
import type { User } from '../types.d';

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState('BRL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { refetch } = useContext(UsersContext)!;

  const handleNewUser = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSave = async (userData: Partial<User>) => {
    try {
      if (editingUser) {
        await UserService.updateUser(editingUser.id, userData);
      } else {
        await UserService.createUser(userData);
      }
      setModalOpen(false);
      setEditingUser(null);
      refetch(); // Atualiza a tabela automaticamente
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário');
    }
  };

  const handleLogout = () => {
    console.log('Logout realizado');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currency={selectedCurrency} onCurrencyChange={setSelectedCurrency} onLogout={handleLogout} />

      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex justify-between items-center pt-3 pb-2 mt-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              BTC carteiras
            </h1>

          </div>
          
          <Button
            variant="primary"
            size="lg"
            onClick={handleNewUser}
          >
            Adicionar Carteira
          </Button>
        </div>

        <div className="py-4">
          <SearchFilters />
          
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden mb-16">
            <DataTable 
              selectedCurrency={selectedCurrency}
              onEditUser={handleEditUser}
            />
          </div>

          <p className="text-sm text-gray-400 mx-auto mb-10 text-center">Fintools | Desafio Frontend</p>
        </div>

        {/* Modal para adicionar/editar usuário */}
        <UserModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingUser(null);
          }}
          user={editingUser}
          onSave={handleSave}
          selectedCurrency={selectedCurrency}
        />
      </div>
    </div>
  );
}
