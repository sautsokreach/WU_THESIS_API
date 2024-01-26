
const db = require("../config/db.config")
const getList = (req,res) =>{
    var sql = "SELECT * FROM student ORDER BY student_id DESC";
    db.query(sql,(err,result)=>{
        if(!err){
            res.json({
                list:result
            })
        }else{
            res.json({
                error : true,
                message: err
            })
        }
    })
}
const  getOne = (req,res) => {
    var params = req.params;
    if(params != null && params.id){
        sql = "SELECT * FROM student WHERE student_id = ?";
        db.query(sql,[params.id],(err,result)=>{
            if(!err){
                res.json({
                    list : result
                })
            }else{
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    }else{
        res.json({
            error : true,
            message : "Param id require!"
        })
    }
}

const create = (req,res) => {
    // student_id
    // firstname
    // lastname
    // gender
    // tel
    // email
    // description
    // status
    const body = req.body;
    if(body){
        const {
            firstname,
            lastname,
            gender,
            tel,
            email,
            description
        } = body;
        var message = {}; //
        
        if(firstname == null || firstname == ""){
            message.firstname = "Param first name require";
        }
        if(lastname == null || lastname == ""){
            message.lastname = "Param last name require";
        }
        if(Object.keys(message).length != 0){
            res.json({
                error : true, 
                message : message
            })
        }else{
            var sql = "INSERT INTO student (firstname,lastname,gender,tel,email,description) VALUES (?,?,?,?,?,?)";
            db.query(sql,[firstname,lastname,gender,tel,email,description],(err,result)=>{
                if(!err){
                    res.json({
                        message : "Insert successfully!"
                    })
                }else{
                    res.json({
                        error:true,
                        message : err
                    })
                }
            })
        }

    }
}
const edit = (req,res) => {
    const body = req.body;
    if(body){
        const {
            student_id,
            firstname,
            lastname,
            gender,
            tel,
            email,
            description
        } = body;
        var message = {}
        if(student_id == null || student_id == ""){
            message.student_id = "Param teacher id require";
        }
        if(firstname == null || firstname == ""){
            message.firstname = "Param first name require";
        }
        if(lastname == null || lastname == ""){
            message.lastname = "Param last name require";
        }
        if(Object.keys(message).length != 0){
            res.json({
                error : true, 
                message : message
            })
        }else{
            var sql = "UPDATE student SET firstname=?, lastname=?,gender = ?,tel=?, email=?, description=? WHERE student_id = ?"
            db.query(sql,[firstname,lastname,gender,tel,email,description,student_id],(err,result)=>{
                if(!err){
                    res.json({
                        message : "Update successfully!"
                    })
                }else{
                    res.json({
                        error:true,
                        message : err
                    })
                }
            })
        }

    }
}
const remove = (req,res) => {
    var body = req.body;
    if(body){
        if(body.student_id != null && body.student_id != ""){
            sql = "DELETE FROM student WHERE student_id = ?";
            db.query(sql,[body.student_id],(err,result)=>{
                if(!err){
                    if(result.affectedRows != 0){
                        res.json({
                            message : "Delete successfully!"
                        })
                    }else{
                        res.json({
                            message : "Student id does not exist !"
                        })
                    }
                    
                }else{
                    res.json({
                        error:true,
                        message : err
                    })
                }
            })
        }else{
            res.json({
                error:true,
                message : "Student id require!"
            })
        }
    }else{
        res.json({
            error:true,
            message : "Student id require!"
        })
    }
}

module.exports =  {
    getList,
    getOne,
    create,
    edit,
    remove
}