const { age, date }  = require ("../../lib/utils")
const db = require ("../../config/db")

module.exports = {
    all(callback){
        db.query("SELECT * FROM members", function(err, results){
            if(err) throw `Database error ${err}`
            callback(results.rows)
        })
    },
    create(data, callback){

        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                gender,
                birth,
                blood,
                weight,
                height
            )VALUES ($1, $2, $3, $4, $5, $6 ,$7, $8)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height
        ]

            db.query(query , values , function(err, results){
                if(err) throw `Database error ${err}`
                callback(results.rows[0])
            })
    },
    find(id ,callback){
        db.query("SELECT * FROM members WHERE id = $1",[id] , function(err, results){
            if(err) throw `Database error ${err}`
            
            callback(results.rows[0])
        })
    },
    update(){
        
    },
    delete(){
        
    },

}