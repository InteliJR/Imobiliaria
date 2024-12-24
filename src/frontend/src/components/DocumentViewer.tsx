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
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth(); 
    window.addEventListener("resize", updateWidth); 
    return () => {
      window.removeEventListener("resize", updateWidth); 
    };
  }, []);

  // Lógica para definir a largura da página
  const getPageWidth = () => {
    if (containerWidth && containerWidth <= 550) {
      return containerWidth;
    }
    return 550; // Fixamente 550px se a largura do container for maior que 700px
  };

  return (
    <div
      ref={containerRef}
      className="document-viewer flex flex-col items-center p-4 border rounded-md bg-gray-100"
    >
      <Document
        file={fileUrl}
        className="border-2 border-gray-400 rounded-[5px] overflow-hidden"
        error={
          <p className="text-neutral-700">
            Não foi possível acessar este documento
          </p>
        }
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<p className="text-neutral-700">Carregando documento...</p>}
        externalLinkRel="noopener"
        externalLinkTarget="_blank"
      >
        <Page
          pageNumber={pageNumber}
          width={getPageWidth()} // Largura dinâmica ou fixa
          error={
            <p className="text-neutral-700">
              Não foi possível carregar esta página
            </p>
          }
          loading={<p className="text-neutral-700">Carregando a página...</p>}
        />
      </Document>
      <div className="controls flex items-center gap-2 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-neutral-800 text-white rounded disabled:bg-neutral-300"
        >
          <IoIosArrowBack />
        </button>
        <span>
          {pageNumber} de {numPages || "?"}
        </span>
        <button
          onClick={goToNextPage}
          disabled={numPages ? pageNumber >= numPages : true}
          className="px-4 py-2 bg-neutral-800 text-white rounded disabled:bg-neutral-300"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default DocumentViewer;
