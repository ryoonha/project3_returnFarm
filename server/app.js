import { sequelize } from "./models/index";

sequelize
    .sync({ force: false })//기존데이터유지
    .then(() => {
    	console.log('데이터 베이스 연결 성공');
    })
    .catch(err => {
    	console.error(err);
    });