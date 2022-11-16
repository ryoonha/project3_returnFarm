const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 시퀄라이즈는 id 자동 생성 (auto_increament)
        user_id: {
          type: Sequelize.STRING(20),
          allowNull: false, //NOT NULL
          unique: true, // 중복 비허용
        },
        user_pwd: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        user_nick: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        user_pfp: {
          type: Sequelize.TEXT,
        },
        address: {
          type: Sequelize.STRING(100),
          unique: true,
        },
        private_key: {
          type: Sequelize.STRING(100),
          unique: true,
        },
        token_amount: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        underscored: true,
        modelName: "User", // 모델명
        tableName: "users", // 테이블명
        paranoid: false, // x : deletedAt 자동 생성
        charset: "utf8", // 한글 입력 설정
        collate: "utf8_general_ci",
      }
    );
  }
};

// export async function userRegister(username) {
//   return User.findOne({ where: { username } });
// }



// export async function userRegister(user_id, user_pwd, user_nick) {
//   console.log("치케치케치케");
//   const result = await User.create({
//     user_id,
//     user_pwd,
//     user_nick,
//   });
//   console.log("왜혼자먹어요");
//   return result;
// };


//✅신규유저등록
// User.create({
//   user_id: "bob",
//   user_pwd: "1234",
//   user_nick: "슈비슈밥",
// }).then((_) => console.log("⭐️신규유저등록완료"));

// export const userRegister = async (user_id, user_pwd, user_nick) => {
//   console.log("치케치케치케");
//   const result = await User.create({
//     user_id,
//     user_pwd,
//     user_nick,
//   });
//   console.log("왜혼자먹어요");
//   return result;
// };

// const test = userRegister("totoro", "1234", "열근하는토토로");
// console.log(test);

// const userLogin = async (
//   user_id,
//   user_pwd,
// ) => {
//   return await User.findOne({
//     where: {user_id,user_pwd},
//     include: [
//       {model: User, attributes:['user_id','user_nick','user_pfp','address','token_amount','created_at'] }
//     ]
//   })
// }

//✅전체검색
// User.findAll().then(console.log);

//----작업중
// User.findAll({
// attributes: [];
//   include: [{ model: User, attributes: ["address"] }],
//   limit: 3,
// });

//✅한명만찾아서 정보 업데이트
// User.findOne({ where: { user_id: "robin" }})
// .then(user => {
//   if (user) {
//     user.update({ address: "0xA6eeC2E263114AF12d468A5b3f70De31d1d99dAa" , private_key:"47dce18db1bcd0cce8ccb5a4c87c4be2da35710e6a49dd3abf00d809c81cfb4a"})
//     .then(r => console.log("⭐️Data is updated!"));
//   }
// });

// User.findOne({ where: { address: "0xDf2DddDb52904F1Ce173786222eebC8Dd326f2Cc" }})
// .then(user => {
//   if (user) {
//     user.update({token_amount:"76"})
//     .then(r => console.log("⭐️Data is updated!"));
//   }
// });

// export { userRegister };
