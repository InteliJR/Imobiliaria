import React, { useState } from "react";

interface ImageViewerProps {
  images: string[];
}

const ImovelImage: React.FC<ImageViewerProps> = ({ images }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-600">Nenhuma imagem disponível.</p>;
  }

  // A primeira imagem será exibida como destaque
  const mainImage = images[0];

  // Abre/Fecha a galeria
  const openGallery = () => setIsGalleryOpen(true);
  const closeGallery = () => setIsGalleryOpen(false);

  // Abre/Fecha o zoom de uma imagem específica
  const handleZoomImage = (image: string) => setZoomedImage(image);
  const handleCloseZoom = () => setZoomedImage(null);

  return (
    <div className="flex flex-col items-center m-4">
      {/* Imagem em destaque */}
      <div className="mb-4">
        <img
          src={mainImage}
          alt="Imagem principal"
          className="max-w-md h-auto rounded cursor-pointer"
          onClick={() => handleZoomImage(mainImage)} 
          /* Agora, ao clicar na imagem principal, abre o zoom */
        />
      </div>

      {/* Se houver mais de uma imagem, mostra o botão para abrir a galeria */}
      {images.length > 1 && (
        <button
          onClick={openGallery}
          className="px-4 py-2 bg-[#1F1E1C] text-white rounded"
        >
          Ver mais
        </button>
      )}

      {/* Modal da galeria de todas as imagens */}
      {isGalleryOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white w-4/5 max-w-xl rounded p-4 relative">
            <button
              onClick={closeGallery}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm"
            >
              Fechar
            </button>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className="w-1/3 min-w-[80px] overflow-hidden cursor-pointer"
                  onClick={() => handleZoomImage(image)}
                >
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-96 h-auto rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de zoom (ampliação) da imagem selecionada */}
      {zoomedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[9999]">
          <div className="relative flex flex-col items-center">
            <button
              onClick={handleCloseZoom}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm"
            >
              Fechar
            </button>
            <img
              src={zoomedImage}
              alt="Imagem ampliada"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImovelImage;
