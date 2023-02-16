const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
}

const getStudentbyID = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentbyID,[id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudent = (req, res) => {
    const {id, name, email, age, dob } = req.body;
    //check email
    pool.query(queries.checkEmailExists, [email] , (error, results) => {
        if(results.rows.length){
            res.send('email already exist')
        }
        //add studnet
        pool.query(queries.addStudent, [id, name, email, age, dob], (error, results) => {
            if(error) throw error;
            res.status(201).send('student created sucessfulyy')
        })

    })

}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentbyID, [id], (error, results) => {
        const noStudentFound = !results.rows.length
        if(noStudentFound){
        res.send(`student with id ${id} not found`)
        }
        else{ pool.query(queries.removeStudent, [id], (error, results) => {
            if(error) throw error
            res.status(200).send(`student with id ${id} is deleted`)
        
        })
    }
    })


}

module.exports = {
    getStudents,
    getStudentbyID,
    addStudent,
    removeStudent,
}