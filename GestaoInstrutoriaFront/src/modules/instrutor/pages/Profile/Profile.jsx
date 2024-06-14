import { useProfileContext } from "../../services/ProfileContext";
import Header from "../../../../components/header/Header";
import TextInput from "../../../../components/inputs/TextInput";
import Layout from "../../components/layout/Layout";
import TopBar from '../../../../components/topbar/topBar';
import Loading from "../../../../common/loading/Loading";
import "./profile.css";

const Profile = () => {
    const { instrutorProfile } = useProfileContext();

    console.log(instrutorProfile);

    if (!instrutorProfile) {
        return <Loading />;
    }

    return (
        <Layout>
            <div>
            <TopBar />
            {/* Restante do conteúdo */}
            </div>
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
                                        value={instrutorProfile ? instrutorProfile.nome : ""} 
                                        disabled={true} 
                                    />
                                </div>
                                <div className="profile-office">
                                    <label htmlFor="position">Cargo</label>
                                    <TextInput 
                                        id="position" 
                                        name="position" 
                                        value={instrutorProfile ? instrutorProfile.tipoUsuario : ""} 
                                        disabled={true} 
                                    />
                                </div>
                                <div className="profile-area">
                                    <label htmlFor="area">Área</label>
                                    <TextInput 
                                        id="area" 
                                        name="area" 
                                        value={instrutorProfile && instrutorProfile.Areas ? instrutorProfile.Areas[0].nome : ""} 
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
                                        value={instrutorProfile ? instrutorProfile.email : ""} 
                                        disabled={true} 
                                    />
                                </div>
                                <div className="profile-unity">
                                    <label htmlFor="unity">Unidade</label>
                                    <TextInput 
                                        id="unity" 
                                        name="unity" 
                                        value={instrutorProfile ? instrutorProfile.unidade : ""} 
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
