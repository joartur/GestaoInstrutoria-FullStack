import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import Layout from "../../components/layout/Layout"
import Header from "../../components/header/Header"
import TextInput from "../../components/inputs/TextInput"
import DateInput from '../../components/inputs/DateInput'
import BigInput from '../../components/inputs/BigInput'
import Button from '../../components/buttons/Button'
import TimeInput from '../../components/inputs/TimeInput'
import "../CreateService/createService.css"

const EditService = () => {
    return (
        <Layout>
            <Header title="Editar Serviço Educacional" description="Preencha os dados e edite seu registro de serviço educacional"/>
            <main>
                <div className="createServiceForm-container">
                    <div className="createServiceForm-header">
                        <p>Edite as Informações do Seu Serviço Educacinoa</p>
                        <hr />
                    </div>
                    <div className="createServiceForm-body">
                        <form>
                            <label htmlFor="">Título do Serviço Educacional</label>
                            <TextInput placeholder= "Título do Serviço Educacional Prestado"/>
                            <div className="dateInput-container">
                                <label htmlFor=""><FontAwesomeIcon icon={faCalendar} className="icon"/>Data</label>
                                <DateInput />
                            </div>
                            <div className="timeInput-container">
                                <div className="timeInput-box">
                                    <label htmlFor=""><FontAwesomeIcon icon={faClock} className="icon"/>Início (Hora)</label>
                                    <TimeInput />
                                </div>
                                <div className="timeInput-box">
                                    <label htmlFor=""><FontAwesomeIcon icon={faClock} className="icon"/>Fim (Hora)</label>
                                    <TimeInput />
                                </div>
                            </div>

                            <div className="selectInput-container">
                            <label htmlFor="">Selecione a Atividade:</label>
                            <select name="" id="">
                                <option value="">Escolha</option>
                            </select>
                            </div>
                                                      
                            <div className="descriptionInput-container">
                                <label htmlFor="">Descrição da Atividade:</label>
                                <BigInput placeholder="Descreva a atividade realizada com pelo menos 50 palavras" />
                            </div>
                            
                            <Button title="Editar" size="medium"/>
                        </form>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default EditService;