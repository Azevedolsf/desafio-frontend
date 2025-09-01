import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { UserService } from '../services/userService';
import type { User } from '../types.d';

interface UseUsersFilters {
  nome?: string;
  sobrenome?: string;
  email?: string;
}

interface UsersContextType {
  users: User[];
  total: number;
  totalPages: number;
  loading: boolean;
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  updateFilters: (filters: UseUsersFilters) => void;
  refetch: () => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<UseUsersFilters>({});
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const usersData = await UserService.getUsers();
      setAllUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    if (!allUsers.length) return [];

    return allUsers.filter(user => {
      const { nome, sobrenome, email } = filters;
      
      const matchNome = !nome || user.nome.toLowerCase().includes(nome.toLowerCase());
      const matchSobrenome = !sobrenome || user.sobrenome.toLowerCase().includes(sobrenome.toLowerCase());
      const matchEmail = !email || user.email.toLowerCase().includes(email.toLowerCase());
      
      return matchNome && matchSobrenome && matchEmail;
    });
  }, [allUsers, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return filteredUsers.slice(startIndex, startIndex + perPage);
  }, [filteredUsers, page, perPage]);

  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / perPage);

  const updateFilters = useCallback((newFilters: UseUsersFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const contextValue: UsersContextType = {
    users: paginatedUsers,
    total,
    totalPages,
    loading,
    page,
    perPage,
    setPage,
    updateFilters,
    refetch: fetchUsers
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext };
