const loginController = {
    login: async (req, res) => {
        try {
            const { username} = req.body;
            if(username == "i"){
                res.status(200).json({usuario: 'instrutor'}); 

            } else if(username == "c"){
                res.status(200).json({usuario: 'coordenador'}); 

            } else if(username == "a"){
                res.status(200).json({usuario: 'administrador'}); 
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = loginController;