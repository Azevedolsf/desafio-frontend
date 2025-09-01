import { useState, useEffect, useCallback, useContext } from 'react';
import Input from './Input';
import Button from './Button';
import { UsersContext } from '../contexts/UsersContext';

export default function SearchFilters() {
  const [searchNome, setSearchNome] = useState('');
  const [searchSobrenome, setSearchSobrenome] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const { updateFilters } = useContext(UsersContext)!;

  // Verificar se todos os campos estão vazios e limpar filtros automaticamente
  useEffect(() => {
    const allFieldsEmpty = !searchNome.trim() && !searchSobrenome.trim() && !searchEmail.trim();
    if (allFieldsEmpty) {
      updateFilters({});
    }
  }, [searchNome, searchSobrenome, searchEmail, updateFilters]);

  const handleSearch = useCallback(() => {
    updateFilters({
      nome: searchNome.trim() || undefined,
      sobrenome: searchSobrenome.trim() || undefined,
      email: searchEmail.trim() || undefined
    });
  }, [searchNome, searchSobrenome, searchEmail, updateFilters]);

  return (
    <div className="bg-white rounded-md shadow-lg shadow-gray-200/50 border border-gray-200 p-4 mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          <Input
            value={searchNome}
            onChange={setSearchNome}
            placeholder="Nome"
            label="Nome"
          />
          <Input
            value={searchSobrenome}
            onChange={setSearchSobrenome}
            placeholder="Sobrenome"
            label="Sobrenome"
          />
          <Input
            value={searchEmail}
            onChange={setSearchEmail}
            placeholder="E-mail"
            label="E-mail"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSearch}
          className="inline-flex items-center h-12"
        >
          <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19a6 6 0 01-6-6 6 6 0 016-6 6 6 0 016 6 6 6 0 01-6 6zM21 21l-4.35-4.35" />
          </svg>
          Buscar
        </Button>
      </div>
    </div>
  );
}
