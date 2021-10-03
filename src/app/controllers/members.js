const db = require("../../config/db")
const { age, date }  = require ("../../lib/utils")

const Member = require("../models/member")

module.exports = {
    index(req, res){
        Member.all(function(members){
            return res.render('members/index', {members})
        })
        
    },
    create(req, res){
       
            return res.render('members/create')
       
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] ==""){
                return res.send(`Please fill all fields` )
            }
        }
        
        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })

    },
    show(req, res){
        Member.find(req.params.id ,function(member){
            if(!member) return res.send("member not found")

            member.birth = date(member.birth).iso
            member.created_at = date(member.created_at).format

            return res.render(`members/show` , {member})
        })
    },

    edit(req, res){

        return
    },
    put(req, res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] ==""){
                return res.send(`Please fill all fields` )
        }
    }

        return
    },
    delete(req, res){

        return

    },
   
}


