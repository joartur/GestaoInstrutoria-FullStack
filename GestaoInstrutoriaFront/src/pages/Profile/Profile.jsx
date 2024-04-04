import Header from "../../components/header/Header"
import TextInput from "../../components/inputs/TextInput"
import Layout from "../../components/layout/Layout"
import { useDataContext } from '../../services/DataContext';
import Loading from "../loading/Loading"
import "./profile.css"

const Profile = () => {
    const { instrutorProfile } = useDataContext();

    if (!instrutorProfile) {
        return <Loading />
    }

    return (
       <Layout>
            <Header title="Dados Cadastrados" description="Visualize seus dados cadastrads"/>
            <main>
                <div className="profile-container">
                    <div className="profile-header">
                        <p>Informações Pessoais</p>
                        <hr />
                    </div>
                        {instrutorProfile ? (
                            (
                                <div className="profile-body">
                                    <form>
                                                <div className="profile-top">
                                            <div className="profile-name">
                                                <label htmlFor="fullName">Nome Completo</label>
                                                <TextInput id="fullName" name="fullName" value={instrutorProfile.nome} disabled={true} />
                                            </div>

                                            <div className="profile-office">
                                                <label htmlFor="position">Cargo</label>
                                                <TextInput id="position" value="Instrutor" name="position" disabled={true} />
                                            </div>

                                            <div className="profile-area">
                                                <label htmlFor="area">Área</label>
                                                <TextInput id="area" name="area" value={instrutorProfile.area} disabled={true} />
                                            </div>
                                        </div>

                                        <div className="profile-bottom">
                                            <div className="profile-email">
                                                <label htmlFor="email">Email</label>
                                                <TextInput id="email" name="email" value={instrutorProfile.email} disabled={true} />
                                            </div>

                                            <div className="profile-unity">
                                                <label htmlFor="unity">Unidade</label>
                                                <TextInput id="unity" name="unity" value={instrutorProfile.unidade} disabled={true} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                        ) : (<h1>Carregando...</h1>)}    
                </div>
            </main>
       </Layout>
    )
}

export default Profile;