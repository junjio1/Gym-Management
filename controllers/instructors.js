const fs = require('fs')
const data = require("../data.json")
const { age, date }  = require ("../utils.js")

// Index

exports.index =  function(req, res){
    return res.render('instructors/index', { instructors : data.instructors })
}



exports.create = function(req, res){
    return res.render('instructors/create')
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
    //  Destruturacao de dados 
    let {avatar_url, name, birth , gender, services} = req.body

    // tratamento de dados
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })
    //   Enviando os dados do req.body para data.json
    fs.writeFile("data.json" , JSON.stringify(data, null, 2 ), function(err){
        if (err) return res.send("Write error file")

        return res.redirect("/instructors")
    })

    // return res.send(req.body)
}

// show
exports.show = function(req, res){
    // req.params
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })
    if (!foundInstructor) return res.send("instructor not found")



    // (...) spread espalhar oscampos achaddo no foundinstructors
    // dentro da variavel instructor
    const instructor = {
        ...foundInstructor,
        age:age(foundInstructor.birth),
        services: foundInstructor.services.split(","), //spli transforma strings em array
        created_at: new Intl.DateTimeFormat('pt-br').format(foundInstructor.created_at),
    }

    return res.render("instructors/show", { instructor })
}

// edit 
exports.edit = function (req, res){

    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })
    if (!foundInstructor) return res.send("instructor not found")

    const instructor = {
        ...foundInstructor,
        birth:date(foundInstructor.birth).iso,
    }

    return res.render('instructors/edit.njk', { instructor })

    
}

//  put 
exports.put = function (req, res){

    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if ( id == instructor.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundInstructor) return res.send("instructor not found")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor 

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send ("write error")

        return res.redirect(`/instructors/${id}`)
    })
}

// Delete 
exports.delete = (req,res) => {
    const { id } = req.body
    
    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null , 2), function(err){
       if(err) return res.send("Write File Error")

       return res.redirect('/instructors')
    })
}

