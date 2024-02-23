const db = require("../config/db.config");
const {isEmpty} = require("../config/hepler")

const getAll = (req, res) => {
    var sql = "SELECT * FROM schedule";
    db.query(sql,(err,result)=>{
        if(!res.err){
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
};

const create = (req,res) => {
    var message = {};
    var body = req.body;
    // if(body){
    //     if(isEmpty(body.name)){
    //         message.name = "param name require!"
    //     }else if(isEmpty(body.code)){
    //         message.code = "param code require!"
    //     }
    // }
    // if(Object.keys(message).length > 0 ){
    //     res.json({
    //         error : true,
    //         message : message
    //     })
    // }else{
        
        const {
            title,year,university,batch,semester,department,start_term,end_term,subject_id,shift
        } = req.body;
        var sql = `SELECT * FROM professor_schedule ps where subject_id = ${subject_id}`;
        // var sql = "INSERT INTO role (`name`,`code`,`discription`) VALUES (?,?,?)";
        
        db.query(sql,(err,result)=>{
            var teacher = {}
            for(var item of result.rows){
               // console.log(result.rows[item].week_day)
                teacher[item.professor_id] ??= {}
                teacher[item.professor_id][item.week_day] ??= {}
                teacher[item.professor_id][item.week_day][item.shift] = item.status     
            }
            result.rows = teacher
            if(!err){
                res.json({
                    list : result
                })
                // if(result.affectedRows != 0){
                //     res.json({
                //         message : "Insert success"
                //     })
                // }
            }else{
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    // }
};
function getRandomDay(days) {
    const randomIndex = Math.floor(Math.random() * days.length);
    const randomDay = days[randomIndex];
    days.splice(randomIndex, 1); // Remove the chosen day from the array
    return randomDay;
  }
const update = (req,res) => {
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.name)){
            message.name = "param name require!"
        }else if(isEmpty(body.code)){
            message.code = "param code require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        const {
            name,code,description
        } = req.body;
        var sql = "UPDATE role SET `name` = ? ,`code` = ? ,`discription` = ?";
        db.query(sql,[name,code,description],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Update success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    }
};
const remove = (req,res) => {
    var body = req.body
    var message = {};
    if(body){
        if(isEmpty(body.id)){
            message.id = "param id require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        db.query("DELETE FROM role WHERE id = ?",[body.id],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Remove success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message :err
                })
            }
        })
    }
};

const assignRole = (req,res) => {
    var {user_id,role_id} = req.body;
    if(body){
        if(isEmpty(user_id)){
            message.user_id = "param user_id require!"
        }
        if(isEmpty(role_id)){
            message.role_id = "param role_id require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        db.query("INSERT INTO ueser_role (`user_id`, `role_id`) VALUES (?,?) ",[user_id,role_id],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Inset success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message :err
                })
            }
        })
    }
}


module.exports = {
  getAll,
  create,
  update,
  remove,
  assignRole
};
