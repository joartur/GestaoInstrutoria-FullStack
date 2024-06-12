import { useCoordenadorContext } from "../../services/CoordenadorContext";
import Header from "../../../../components/header/Header";
import TextInput from "../../../../components/inputs/TextInput";
import Layout from "../../components/layout/Layout";
import Loading from "../../../../common/loading/Loading";
import "./profile.css";

const Profile = () => {
    const { coordenadorProfile } = useCoordenadorContext();
    console.log(coordenadorProfile);

    if (!coordenadorProfile) {
        return <Loading />;
    }

    return (
        <Layout>
            <Header title="Dados Cadastrados" description="Visualize seus dados cadastrados" />
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
                                    <label htmlFor="fullName">Nome Completo</label>
                                    <TextInput 
                                        id="fullName" 
                                        name="fullName" 
                                        value={coordenadorProfile && coordenadorProfile.nome ? coordenadorProfile.nome : ""} 
                                        disabled={true} 
                                    />
                                </div>
                                <div className="profile-office">
                                    <label htmlFor="position">Cargo</label>
                                    <TextInput 
                                        id="position" 
                                        name="position" 
                                        value={coordenadorProfile && coordenadorProfile.tipoUsuario ? coordenadorProfile.tipoUsuario : ""} 
                                        disabled={true} 
                                    />
                                </div>
                                <div className="profile-area">
                                    <label htmlFor="area">Área</label>
                                    <TextInput 
                                        id="area" 
                                        name="area" 
                                        value={coordenadorProfile && coordenadorProfile.Areas ? coordenadorProfile.Areas[0].nome : ""} 
                                        disabled={true} 
                                    />
                                </div>
                            </div>
                            <div className="profile-bottom">
                                <div className="profile-email">
                                    <label htmlFor="email">Email</label>
                                    <TextInput 
                                        id="email" 
                                        name="email" 
                                        value={coordenadorProfile && coordenadorProfile.email ? coordenadorProfile.email : ""} 
                                        disabled={true} 
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Profile;
