const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    cipher : async (password)=>{
        return new Promise(async (resolve, reject) => {
            bcrypt.hash(password, saltRounds)
            .then((hash) => {
                resolve(hash);
            })
            .catch((err)=>{
                reject(err);
            })
        })
    },

    compare : async (password, hash) => {
        return new Promise(async (resolve) => {
            bcrypt.compare(password, hash, (err, result) => {
                console.log(password, hash);
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