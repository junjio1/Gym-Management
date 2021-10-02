module.exports = {
        // Funcao para transformar o datestamp em data
    age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        // 1993 - 2020 
        let age = today.getFullYear() - birthDate.getFullYear()
        let month = today.getMonth() - birthDate.getMonth()
        
        today.getDate()
        // 11 - 12 = -1 
        // 11 -11 = 0
        if ( month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1 
        }
    //  04/1998
    
    //  04 - 05 = -1 
    //  04 -04 =0 
    //  04 - 03 = 1 
    
        return age
    },

    date(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
           iso: `${year}-${month}-${day}`,
           birthDay: `${day}/${month}/${year}`,
           format: `${day}/${month}/${year}`,
        }

    }
}



