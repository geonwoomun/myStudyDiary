## 시퀄라이즈 사용법 

orm 설명 할 때 말한 대로 sequelize 와 mysql2 설치를 한다.

그리고 database라는 폴더를 만들고 그 밑에 db.js라는 파일을 만들어서

const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize('db명',
    '사용자명',
    '패스워드',
{
    host : "호스트명// 저의 경우에는 아마존 rds host 명 적음",
    dialect : 'mysql',
    operatorsAliases: false,

    pool : {
        max:5,
        min:0,
        acquire: 30000,
        idel : 10000
    }
}
    
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

와 같은 내용을 넣는다.

그러면 이제 이거를 활용해서 mysql rds를 사용할 수 있게 된다.

그리고 난 그 밑에 models라는 폴더를 만들었다.

그 안에는 db 엔터티(모델)들을 넣는다.


내가 한거중 하나는

const Sequelize = require('sequelize');
const db = require('../database/db');
const favoriteFolder = require('./favoriteFolder');
const follow = require('./follow');
// const imgLiked = require('./imgLiked');

const User = db.sequelize.define(
    'user',
    {
        ID : {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        PASSWORD: {
            type: Sequelize.STRING,
        },
        email : {
            type: Sequelize.STRING,
        },
        nickname : {
            type: Sequelize.STRING,   
        },
        introduce: {
            type: Sequelize.STRING,
        },
        follow : {
            type: Sequelize.INTEGER,
        },
        follower : {
            type: Sequelize.INTEGER,   
        },
        grade: {
            type : Sequelize.STRING
        },
        film : {
            type : Sequelize.INTEGER
        },
        created: {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)
User.hasMany(favoriteFolder, {foreignKey : 'ID', sourceKey: 'ID' });
User.hasMany(follow, {foreignKey : 'followID', sourceKey: 'ID'});
User.hasMany(follow, {foreignKey : 'followerID', sourceKey: 'ID'});
// User.hasMany(imgLiked, {foreignKey : 'likeID', sourceKey: 'ID'});

module.exports = User;

이런식으로 User 모델을 만들었다.
User.hasMany(temp, ..) 는 user 가 temp 와 1:N 관계에 있다는 것을 의미한다.
temp는 위에 require 이런식으로 다른 모델을 불러와야한다.

그럼 이제 사용법을 알아본다.


이거는 좋아요 파일과 폴더를 만들고 불러오고 하는 걸 만든 것이다.

const express = require('express'); // express를 불러온다.
const Favorite = express.Router(); // express.Router를 실행시킨것을 Favorite에 넣는다.
const Sequelize = require('sequelize'); // sequelize를 불러온다. sequelize.fn, literal 등을 사용 할때 사용.
const favoriteFolder = require('../models/favoriteFolder'); // 모델
const favorite = require('../models/favorite'); // 모델


Favorite.post('/', (req, res) => {  // server에 routes 해놓은 경로로 들어왔을 때 실행 
    const ID = req.body.userID;
    favoriteFolder.findAll({
        where : {
            ID
        }
    })
    .then(folder => {
        res.json(folder);
    })
})

Favorite.post('/addFolder', (req, res) => { // 코인 충전 했을 때 코인을 충전한 금액의 /100 만큼 충전.
    const ID = req.body.info.ID;
    const favFolderName = req.body.info.folderName;
    const temp = {
        ID,
        favFolderName
    }
    favoriteFolder.create({
       ID : temp.ID,
       favFolderName : temp.favFolderName
    })
    .then(folder => {
        res.json(folder);
    })
})

Favorite.post('/addPhotoInFolder', (req, res) => { // 서버 라우트 경로/addPhotoInFolder로 들어왔을 때 
    const favFolderNum = req.body.info.folderNum;
    const photo = req.body.info.photo;
    favorite.create({
        favFolderNum,
        favName : photo
    })
})


Favorite.post('/getAll', (req, res) => {
    const ID = req.body.ID;  // 아이디를 받아서 그 사람의 모든 폴더네임과 이미지네임을 출력해준다.
    favoriteFolder.findAll({attributes:['favFolderName'],
    include: [{model: favorite, attributes : ['favName']}], 
    where : {
        ID
    }})
    .then(folder => {
        res.json(folder);
    })
})

Favorite.post('/getAll2', (req, res) => {
    const ID = req.body.ID;  // 아이디를 받아서 그 사람의 모든 폴더네임과 이미지네임을 출력해준다.
    favorite.findAll({
    include: [{model: favoriteFolder}], 
    where : {
        ID
    }})
    .then(folder => {
        res.json(folder);
    })
})


module.exports = Favorite;


모델. 함수를 입력하면 sequelize 함수를 쓸 수 있는데 

select 문에 findAll 찾은 모든 row를 출력 findOne 은 하나만 출력
update에 update 
delete에 destroy
insert 에 create가 있다.


그래서 여러가지 절들을 쓰려면
    favoriteFolder.findAll({attributes:['favFolderName'],
    include: [{model: favorite, attributes : ['favName']}], 
    where : {
        ID
    }})
    .then(folder => {
        res.json(folder);
    })
    
    이런식으로 해야한다.
    attributes는 출력할 속성들을 넣는것이다.
    include는 model에 적은 모델과 left outer join을 해준다. 그리고 그 model의 attributes를 적을 수 있따.
    where은 sql의 where 문처럼 적는다.
    group by는 group: 에 적음으로서 할 수 있다.
    
    근데 이런 것만으로는 한계가 있어서 Sequelize.literal()을 사용하면 sql문 비슷하게 쓸 수 있다.
    Sequelize.fn 을 쓰면 sql문의 함수들을 사용할 수 있다.
    
    근데 이것만으로는 join 문을 짜기 힘들어서 직접 query문을 짜는 것을 사용하기로 했다.
    그래서 query 라는 함수를 쓰기로 했다.
    
    


