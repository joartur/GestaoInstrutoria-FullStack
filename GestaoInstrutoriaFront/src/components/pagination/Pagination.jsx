import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../services/DataContext';
import "./pagination.css"

const Pagination = () => {

    const { data } = useDataContext();
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleChange = (event) => {
        setItemsPerPage(event.target.value);
    };



    return ( 
        <div className="pagination-container">
                <div className="pagination-lines">
                    <p>Linhas por Página:</p>
                    <input type="number" className="paginationInput" id="pages" name="pages" min="1" value={itemsPerPage} onChange={handleChange}/>
                </div>

                <div className="pagination-pages">
                <FontAwesomeIcon icon={faChevronLeft} className="arrow"/>
                <p>1 de {totalPages}</p>
                <FontAwesomeIcon icon={faChevronRight} className="arrow"/>
                </div>
        </div>
    )
}

export default Pagination;