import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./pagination.css"

const handleChange = (event) => {
    console.log(event.target.value)
};

const Pagination = () => {
    return ( 
        <div className="pagination-container">
                <div className="pagination-lines">
                    <p>Linhas por Página:</p>
                    <input type="number" className="paginationInput" id="pages" name="pages" value="6" onChange={handleChange}/>
                </div>

                <div className="pagination-pages">
                <FontAwesomeIcon icon={faChevronLeft} className="arrow"/>
                <p>1 de 3</p>
                <FontAwesomeIcon icon={faChevronRight} className="arrow"/>
                </div>
        </div>
    )
}

export default Pagination;