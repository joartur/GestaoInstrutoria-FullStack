import Button from "../../components/buttons/Button"
import ButtonFilter from "../../components/buttons/ButtonFilter"
import Header from "../../components/header/Header"
import TextInput from "../../components/inputs/TextInput"
import Layout from "../../components/layout/Layout"
import "./profile.css"

const Profile = () => {
    return (
       <Layout>
            <Header title="Dados Cadastrados" description="Visualize seus dados cadastrads"/>
            <main>
                <div className="profile-container">
                    <div className="profile-header">
                        <p>Informações Pessoais</p>
                        <hr />
                    </div>
                    <div className="profile-body">
                        <form>
                            <div className="profile-top">

                                <div className="profile-name">
                                    <label htmlFor="">Nome Completo</label>
                                    <TextInput disabled="true"/>
                                </div>

                                <div className="profile-office">
                                    <label htmlFor="">Cargo</label>
                                    <TextInput disabled="true"/>
                                </div>

                                <div className="profile-area">
                                    <label htmlFor="">Área</label>
                                    <TextInput disabled="true"/>
                                </div>
                                                                         
                            </div>   

                            <div className="profile-bottom">

                                <div className="profile-email">
                                    <label htmlFor="">Email</label>
                                    <TextInput disabled="true"/>
                                </div>

                                <div className="profile-unity">
                                    <label htmlFor="">Unidade</label>
                                <TextInput disabled="true"/>
                                </div>

                                </div>

                            <div className="profileButtons-container">
                            <ButtonFilter title="Cancelar" size="medium"/>
                            <Button title="Salvar" size="medium"/>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
       </Layout>
    )
}

export default Profile;