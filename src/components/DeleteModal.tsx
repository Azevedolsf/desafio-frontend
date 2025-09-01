import Button from './Button';

interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ isOpen, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white rounded-lg py-12 max-w-xl w-full mx-8" onClick={(e) => e.stopPropagation()}>
        {/* Ícone de lixeira com borda vermelha */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20  rounded-full border-2 border-[#e22849] flex items-center justify-center">
            <svg className="w-12 h-12 text-[#e22849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-bold text-text-primary text-center">
          Excluir Carteira
        </h3>
        
        <p className="text-text-secondary text-center mb-8">
          Tem certeza que deseja excluir essa carteira?<br />
          Esta ação não poderá ser desfeita.
        </p>
        
        <div className="flex flex-col space-y-4 px-24">
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            className="w-full"
          >
            Excluir
          </Button>
          <Button
            variant="text"
            size="md"
            onClick={onCancel}
            className="w-full"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
