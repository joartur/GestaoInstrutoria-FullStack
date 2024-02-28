import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Header from "../../components/header/Header"
import Layout from "../../components/layout/Layout"
import BigInput from "../../components/inputs/BigInput"
import TableSituation from "../../components/table/TableSituation"
import Button from "../../components/buttons/Button"
import "./viewServices.css"

const ViewServices = () => {
    return (
        <Layout>
            <Header title="Serviço Educacional Cadastrado" description="Veja as informações do serviço educacional que você cadastrou!"/>
            <main className="viewServices-container">
                <div className="title-container">
                    <h1>Título do Serviço Educacional</h1>
                </div>

                <div className="situation-container">
                    <TableSituation title="Em Análise" type="analysis"/>
                </div>

                <div className="serviceInfo-container">
                    <div className="hour-info">
                        <strong>Cadastrado em: </strong><span>00/00/0000</span>
                        <strong>Prazo de entrega: </strong><span>00/00/0000</span>
                    </div>
                    <div className="time-info">
                        <strong>Horário Inincial: </strong><span>13:00</span>
                        <strong>Horário Final: </strong><span>17:00</span>
                        <strong>Total de Horas: </strong><span>0 Horas</span>
                    </div>
                    <div className="description-info">
                        <h2>Descrição do Serviço Educacional:</h2>
                        <BigInput
                        value="Lorem ipsum suspendisse adipiscing nunc nam mi blandit, nam molestie amet bibendum feugiat aenean, sapien curabitur proin dictumst integer purus. malesuada cras non massa nunc laoreet aptent tellus morbi, felis eros donec sit suspendisse potenti lobortis, semper phasellus suspendisse accumsan a feugiat porttitor. senac per in diam lorem fringilla diam sed nibh imperdiet arcu, elit volutpat venenatis fames placerat suscipit leo felis risus. tempor dapibus fames metus quis ut rhoncus, risus quam porttitor orci odio, per venenatis nisi vitae sapien. aenean vestibulum quisque tortor torquent sit augue facilisis aenean laoreet massa lorem, vestibulum litora quam integer egestas habitant magna mauris lacus senac, blandit iaculis facilisis ultrices ut lobortis dui ac magna scelerisque."
                        disabled="true"
                        />
                    </div>
                    <div className="justify-container">
                        <h2>Justificativa do Coordenador:</h2>
                        <div className="justify-info">
                            <div className="justify-name">
                                <strong>Justificado por: </strong><span>Nome do Coordenador de Área</span>
                            </div>
                            <div className="justify-date">
                                <strong>Justificado em: </strong><span>01/02/2024</span>
                            </div>

                            <BigInput
                            value=""
                            disabled="true"
                            />
                        </div>
                    </div>
                    <div className="profileButtons-container">
                            <Button title="Editar" size="medium" icon={faPenToSquare} url="/editService"/>
                            <Button title="Deletar" size="medium" icon={faTrash}/>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default ViewServices;