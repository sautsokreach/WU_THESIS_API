const db = require("../config/db.config");
const {isEmpty} = require("../config/hepler")
const fs = require("fs")

// table category
// `category_id`,
// `name`,
// `parent`,
// `image`,
// `sort_order`,
// `status`,
// `create_at`,
// `update_at`;

const getAll = (req, res) => {
    var sql = "SELECT *,DATE_FORMAT(create_at,'%d/%m/%Y %h:%i %p') AS create_at, DATE_FORMAT(update_at,'%d/%m/%Y %h:%i %p') AS update_at FROM category";
    var category_id = null;
    console.log("ddd")
    if(req.params && req.params.id != null){
        console.log(req.params.id)
        sql = sql + " WHERE category_id = ?";
        category_id = req.params.id
    }
    sql += " ORDER BY category_id DESC"
 
  db.query(sql,[category_id],(err,resule)=>{
    if(!res.err){
        res.json({
            list : resule
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
    // `name`,`parent`,`image`,`sort_order`,`status`,
    // url : "api/category"
    // method : "POST"
    // body = {
    //     "name" : "", // not null,
    //     "parent" : 0, 
    //     "image" : "",
    //     "sort_order" : 0,
    //     "sort_order" : 1,
    // }

    var message = {};
    var body = req.body;
    // const info = req.body;
  	// // check if info object is empty
  	// if(JSON.stringfy(info) != '{}') {  
    //   const data1 = info.data1;
    //   const data2 = info.data2;
		
    //   console.log(`data1 is: ${data1}\n data2 is: ${data2}\n `)
    //   res.status(200).send("your message recived!");
    // } else {
    //   res.status(200).send("you didn't send any data!");
    // }

    if(body){
        if(isEmpty(body.name)){
            message.name = "param name require!"
        }

    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        var {
            name,parent,sort_order,status
        } = req.body;

        var image = "";
        if(req.file){
            image = req.file.originalname
        }
        
        var sql = "INSERT INTO category (`name`,`parent`,`image`,`sort_order`,`status`) VALUES (?,?,?,?,?)";
        db.query(sql,[name,parent,image,sort_order,status],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Insert success"
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
const update = (req,res) => {
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.category_id)){
            message.category_id = "param category_id require!"
        }
        if(isEmpty(body.name)){
            message.name = "param name require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        const {
            category_id,name,parent,sort_order,status
        } = req.body;
        var image = "";
        if(req.file){
            image = req.file.originalname
        }
        db.query("SELECT image from category WHERE category_id = ?",[body.category_id],(err1,result)=>{
            var oldImage = "";
            if(!err1){
                oldImage = result[0].image
            }

            var sql = "UPDATE category SET `name` = ? ,`parent` = ? ,`image` = ? ,`sort_order` = ? ,`status` = ? , update_at = NOW()  ";
            sql += " WHERE category_id = ?"
            db.query(sql,[name,parent,image,sort_order,status,category_id],(err,result)=>{
                if(!err){
                    const image_path = "/Applications/XAMPP/xamppfiles/htdocs/project/Image/101/"
                    if (fs.existsSync(image_path+oldImage)) {
                        try {
                            fs.unlinkSync(image_path+oldImage)
                          } catch(err) {
                            console.error(err)
                          }
                    }

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
        })
       
    }
};
const remove = (req,res) => {
    var body = req.body
    var message = {};
    if(body){
        if(isEmpty(body.category_id)){
            message.category_id = "param category_id require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        db.query("SELECT image from category WHERE category_id = ?",[body.category_id],(err1,result)=>{
            var image = "";
            if(!err1){
                image = result[0].image
            }
            db.query("DELETE FROM category WHERE category_id = ?",[body.category_id],(err,result)=>{
                if(!err){
                    if(result.affectedRows != 0){
                        const image_path = "/Applications/XAMPP/xamppfiles/htdocs/project/Image/101/"
                        if (fs.existsSync(image_path+image)) {
                            try {
                                fs.unlinkSync(image_path+image)
                              } catch(err) {
                                console.error(err)
                              }
                        }
                        res.json({
                            message : "Remove success"
                        })
                    }else{
                        res.json({
                            message : "Category not not found"
                        })
                    }
                }else{
                    res.json({
                        error : true,
                        message :err
                    })
                }
            })
        })
        
    }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
