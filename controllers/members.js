const fs = require('fs')
const data = require("../data.json")
const { age, date }  = require ("../utils.js")

// Index

exports.index =  function(req, res){
    return res.render('members/index', { members : data.members })
}

exports.create =  function (req, res){
    return res.render('members/create')
}

// post
exports.post = function (req, res){ 

    // Object.key(re.body) pega somente as chaves/keys do formulario.
const keys = Object.keys(req.body)

for (key of keys){
   if (req.body[key] ==""){
        return res.send(`Please fill all fields` )
        }
    }

    // tratamento de dados
    birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if (lastMember) {
        id =lastMember.id + 1 
    }


    data.members.push({
        id,
        ...req.body,
        birth,
    })

    //   Enviando os dados do req.body para data.json
    fs.writeFile("data.json" , JSON.stringify(data, null, 2 ), function(err){
        if (err) return res.send("Write error file")

        return res.redirect(`/members/${id}`)
    })

}

// show
exports.show = function(req, res){
    // req.params
    const { id } = req.params
    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if (!foundMember) return res.send("member not found")



    // (...) spread espalhar oscampos achaddo no foundmembers
    // dentro da variavel member
    const member = {
        ...foundMember,
        birth:date(foundMember.birth).birthDay,
        created_at: new Intl.DateTimeFormat('pt-br').format(foundMember.created_at),
    }

    return res.render("members/show", { member })
}

// edit 
exports.edit = function (req, res){

    const { id } = req.params
    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if (!foundMember) return res.send("member not found")

    const member = {
        ...foundMember,
        birth:date(foundMember.birth).iso,
    }

    return res.render('members/edit.njk', { member })

    
}

//  put 
exports.put = function (req, res){

    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if ( id == member.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundMember) return res.send("member not found")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member 

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send ("write error")

        return res.redirect(`/members/${id}`)
    })
}

// Delete 
exports.delete = (req,res) => {
    const { id } = req.body
    
    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null , 2), function(err){
       if(err) return res.send("Write File Error")

       return res.redirect('/members')
    })
}

