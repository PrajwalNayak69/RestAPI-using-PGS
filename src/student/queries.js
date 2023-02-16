const getStudents= 'SELECT * FROM public.student'

const getStudentbyID = 'SELECT * FROM public.student WHERE id = $1'

const checkEmailExists = 'SELECT s FROM public.student as s where s.email = $1 '

const addStudent = 'INSERT INTO public.student (id, name, email, age, dob) VALUES ($1, $2, $3, $4, $5)'

const removeStudent = 'DELETE FROM public.student WHERE id = $1'
module.exports = {
    getStudents,
    getStudentbyID,
    checkEmailExists,
    addStudent,
    removeStudent,
}