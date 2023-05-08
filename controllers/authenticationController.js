const login = async (req,res) => {
    try{
    
    }catch(err){
        res.status(200).json({
            status: false,
            message: "error unliking it",
            errors: [err],
            data: {},
            });
    }
}

module.exports = {
    login,
}