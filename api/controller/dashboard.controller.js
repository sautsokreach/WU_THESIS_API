const db = require("../config/db.config");
const { isEmpty } = require("../config/hepler")

const dashboard = (req,res) => {
    const student = {
        title : "Student",
        male : 130,
        female : 100,
        total : 150
    }
    const teacher = {
        title : "Teacher",
        total : 13,
        payment : 800
    }
    const classroom = {
        title : "Classroom",
        total : 40,
        closed : 10,
        openning : 30
    }
    const coures = [
        {
            name : "C++ Programming",
            total_class : 3,
            finish : 2,
            opening : 1,
            get_amount : 100,
            due_ammount : 50,
            total : 150
        },
        {
            name : "C# Window Form",
            total_class : 10,
            finish : 8,
            opening : 2,
            get_amount : 100,
            due_ammount : 50,
            total : 150
        },
        {
            name : "Java Window Form",
            total_class : 12,
            finish : 10,
            opening : 2,
            get_amount : 100,
            due_ammount : 50,
            total : 150
        },
        {
            name : "ReactJs",
            total_class : 12,
            finish : 10,
            opening : 2,
            get_amount : 100,
            due_ammount : 50,
            total : 150
        },
        {
            name : "React Native",
            total_class : 12,
            finish : 10,
            opening : 2,
            get_amount : 100,
            due_ammount : 50,
            total : 150
        },
        {
            name : "NodeJs MySQL",
            total_class : 12,
            finish : 10,
            opening : 2,
            get_amount : 100,
            due_ammount : 50,
            total : 150
        },
        {
            name : "HTML CSS Bootstrap",
            total_class : 12,
            finish : 10,
            opening : 2,
            get_amount : 100,
            due_ammount : 50,
            total : 150
        },

    ]

    const SalePeformance = [
        {title:"8:00" , value : 1000},
        {title:"9:00" , value : 4000},
        {title:"10:00" , value : 5000},
        {title:"11:00" , value : 6000},
        {title:"12:00" , value : 23000},
        {title:"1:00" , value : 4000},
        {title:"2:00" , value : 1000},
        {title:"3:00" , value : 5000},
        {title:"4:00" , value : 500},
        {title:"5:00" , value : 500},
        {title:"6:00" , value : 9000},
    ]

    AppInsight = [
        {title : "Install", value : 10000},
        {title : "Register", value : 5000},
        {title : "Actived", value : 100},
        {title : "Inactive", value : 2500},
    ]

    ArrayImage = [
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
        {
            image : "https://zandokh.com/image/catalog/banner/2022/ten11/pchum-ben/category-collection/banner/women.jpg",
        },
    ]

    res.json({
        student,
        teacher,
        classroom,
        coures,
        SalePeformance,
        AppInsight,
        ArrayImage
    })
}

module.exports = {
    dashboard
}