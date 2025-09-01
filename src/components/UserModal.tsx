import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { User } from '../types.d';
import { useConversion } from '../hooks/useConversion';
import Input from './Input';
import Button from './Button';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  onSave: (user: Partial<User>) => void;
  selectedCurrency?: string;
}

interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  valor_compra: string;
  valor_carteira: number;
}

const initialFormData: FormData = {
  nome: '',
  sobrenome: '',
  email: '',
  valor_compra: '',
  valor_carteira: 0
};

export default function UserModal({ isOpen, onClose, user, onSave, selectedCurrency = 'BRL' }: UserModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { rate } = useConversion('BTC', selectedCurrency);

  const isEditing = useMemo(() => !!user, [user]);

  // Atualiza formData quando user ou rate mudam
  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        valor_compra: (user.valor_carteira * (rate || 1)).toString(),
        valor_carteira: user.valor_carteira
      });
    } else {
      setFormData(initialFormData);
    }
  }, [user, rate]);

  // Limpa erros quando campos são preenchidos
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    
    const hasChanges = Object.keys(errors).some(key => {
      const fieldValue = formData[key as keyof FormData];
      return typeof fieldValue === 'string' && fieldValue.trim() && errors[key];
    });
    
    if (hasChanges) {
      setErrors(prev => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach(key => {
          const fieldValue = formData[key as keyof FormData];
          if (typeof fieldValue === 'string' && fieldValue.trim()) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  }, [formData, errors]);

  const validateForm = useCallback(() => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.sobrenome.trim()) newErrors.sobrenome = "Sobrenome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    if (!formData.valor_compra.trim()) newErrors.valor_compra = "Valor de compra é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleValorCompraChange = useCallback((valor: string) => {
    const cleanValue = valor.replace(/[^\d.,]/g, '');
    const numericValue = parseFloat(cleanValue.replace(',', '.')) || 0;
    const valorBTC = rate ? numericValue / rate : 0;
    
    setFormData(prev => ({
      ...prev,
      valor_compra: valor,
      valor_carteira: valorBTC
    }));
  }, [rate]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    onSave({
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email: formData.email,
      valor_carteira: formData.valor_carteira,
      endereco: user?.endereco || '',
      data_nascimento: user?.data_nascimento || new Date().toISOString().split('T')[0],
      data_abertura: user?.data_abertura || new Date().toISOString().split('T')[0],
      endereco_carteira: user?.endereco_carteira || ''
    });
  }, [formData, validateForm, onSave, user]);

  const handleClose = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  }, [onClose]);



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={handleClose}>
      <div className="bg-white rounded-md shadow-2xl w-full max-w-xl px-10 py-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="py-4 border-b border-gray-200 mb-10">
          <h2 className="text-xl font-bold text-text-primary">
            {isEditing ? 'Editar Carteira' : 'Adicionar Carteira'}
          </h2>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 space-y-2">
          <Input
            value={formData.nome}
            onChange={(value) => setFormData(prev => ({...prev, nome: value}))}
            placeholder="Nome"
            label="Nome"
            error={errors.nome}
          />

          <Input
            value={formData.sobrenome}
            onChange={(value) => setFormData(prev => ({...prev, sobrenome: value}))}
            placeholder="Sobrenome"
            label="Sobrenome"
            error={errors.sobrenome}
          />

          <Input
            type="email"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({...prev, email: value}))}
            placeholder="E-mail"
            label="E-mail"
            error={errors.email}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              value={formData.valor_compra}
              onChange={handleValorCompraChange}
              placeholder="Valor de Compra"
              label="Valor da Compra"
              error={errors.valor_compra}
            />
            
            <div className="w-full h-12 px-3 py-2  text-sm font-bold text-text-primary flex items-center">
              {formData.valor_carteira.toFixed(8)} BTC
            </div>
          </div>
          
          {/* Botões */}
          <div className="flex items-center justify-end space-x-3 pt-6 ">
            <Button variant="text" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}