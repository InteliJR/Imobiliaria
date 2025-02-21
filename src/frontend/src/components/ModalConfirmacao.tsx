import React from 'react';

interface ModalConfirmacaoProps {
  mensagem: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({ mensagem, onConfirm, onCancel }) => {
  // Função para fechar o modal ao clicar fora
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel(); // Fecha o modal chamando a função onCancel
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick} // Define o manipulador de clique no fundo
    >
      <div className="bg-white p-6 m-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
        <p className="mb-6">{mensagem}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="border-2 border-neutral-500 px-4 py-2 rounded hover:border-neutral-900 transition-all duration-200 ease-in-out"
          >
            Não
          </button>
          <button
            onClick={onConfirm}
            className="bg-neutral-900 text-white px-6 py-2 rounded hover:bg-black transition-all duration-200 ease-in-out"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
