import DataGrid from 'react-data-grid';
import "../../pages/InstrutorPages/testPage.css"

const TestPage = () => {

    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' }
    ];
      
      const rows = [
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
    ];

    return (
        <div className="test-container">
            <h1>Teste de Biblioteca React Data Grid!</h1>
            <DataGrid
            columns={columns}
            rows={rows}

            rowClass={row => row.id % 2 === 0 ? 'even-row' : 'odd-row'} // Aplicando estilos alternados para linhas
            headerRowHeight={40} // Altura do cabeçalho da linha
            />;
        </div>        
    )
}

export default TestPage;