import { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configurando o worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface DocumentViewerProps {
  fileUrl: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | undefined>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [pdfWidth, setPdfWidth] = useState<number>(550); // Largura padrão
  
  const viewerRef = useRef<HTMLDivElement | null>(null);
  
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
    setPageNumber(1); // Resetar para a primeira página ao carregar um novo documento
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    const updateWidth = () => {
      if (viewerRef.current) {
        const parentWidth = viewerRef.current.clientWidth;
        setPdfWidth(parentWidth <= 600 ? parentWidth : 550);
      }
    };

    // Atualiza a largura ao montar o componente e ao redimensionar a janela
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div ref={viewerRef} className="w-full flex justify-center relative">
      <Document
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        file={fileUrl}
        className="border-2 border-gray-400 rounded-[5px] overflow-hidden relative"
        error={
          <p className="text-neutral-700 m-2 mx-3">
            Não foi possível acessar este documento
          </p>
        }
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <p className="text-neutral-700 m-2 mx-3">Carregando documento...</p>
        }
        externalLinkRel="noopener"
        externalLinkTarget="_blank"
      >
        <Page
          pageNumber={pageNumber}
          width={pdfWidth}
          error={
            <p className="text-neutral-700 m-2 mx-3">
              Não foi possível carregar esta página
            </p>
          }
          loading={
            <p className="text-neutral-700 m-2 mx-3">Carregando página...</p>
          }
        />
        {/* Controle de página */}
        <div
          className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 z-10 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <button
              onClick={goToPreviousPage}
              disabled={pageNumber <= 1}
              className="px-2 py-1 bg-neutral-800 text-white rounded disabled:bg-neutral-300 hover:bg-neutral-700"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-sm">
              {pageNumber} de {numPages || "?"}
            </span>
            <button
              onClick={goToNextPage}
              disabled={numPages ? pageNumber >= numPages : true}
              className="px-2 py-1 bg-neutral-800 text-white rounded disabled:bg-neutral-300 hover:bg-neutral-700"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </Document>
    </div>
  );
};

export default DocumentViewer;
