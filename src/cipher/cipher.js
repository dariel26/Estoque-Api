const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    cipher : async (password)=>{
        return new Promise(async (resolve) => {
            bcrypt.hash(password, saltRounds)
            .then((hash) => {
                resolve(hash);
            })
            .catch((err)=>{
                console.log(err);
            })
        })
    },

    compare : async (password, hash) => {
        return new Promise(async (resolve) => {
            bcrypt.compare(password, hash, (err, result) => {
                if(err){
                    resolve(false);
                }else{
                    if(result){
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                }
            })
        });
    }
}