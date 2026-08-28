// A Task

// Callback
// console.log("Jack Ma maslahatlaria!");
// const list = [
//   "Yaxshin talaba buling!" /*0,20*/,
//   "Yaxshi boshliq tanlang va kuproq hato qiling!" /*20,30*/,
//   "Siz zur bugan ishni boshlang!" /*30,40*/,
//   "Uzingizni ishlaringizni boshlang!" /*40,50*/,
//   "Yoshlarga invetsissa qiling!" /*50,60*/,
//   "endi dam oling,endi befoyda!" /*60<*/,
// ];

// function maslahatBering(a, callback) {
//   if (typeof a !== "number") callback("iltimos raqam kriting", null);
//   else if (a <= 20) callback(null, list[0]);
//   else if (a > 20 && a <= 30) callback(null, list[1]);
//   else if (a > 30 && a <= 40) callback(null, list[2]);
//   else if (a > 40 && a <= 50) callback(null, list[3]);
//   else if (a <= 60) callback(null, list[4]);
//   else {
//     callback(null, list[5]);
//   }
// }

// maslahatBering(60, (err, data) => {
//   if (err) {
//     console.log("ERROR", err);
//   } else {
//     console.log(data);
//   }
// });

// sync promise then catch await;

console.log("Jack Ma maslahatlaria!");
const list = [
  "Yaxshin talaba buling!" /*0,20*/,
  "Yaxshi boshliq tanlang va kuproq hato qiling!" /*20,30*/,
  "Siz zur bugan ishni boshlang!" /*30,40*/,
  "Uzingizni ishlaringizni boshlang!" /*40,50*/,
  "Yoshlarga invetsissa qiling!" /*50,60*/,
  "endi dam oling,endi befoyda!" /*60<*/,
];

// async function maslahatBering(a) {
//   if (typeof a !== "number") throw new Error("iltimos raqam kriting");
//   else if (a <= 20) return list[0];
//   else if (a > 20 && a <= 30) return list[1];
//   else if (a > 30 && a <= 40) return list[2];
//   else if (a > 40 && a <= 50) return list[3];
//   else if (a <= 60) return (null, list[4]);
//   else {
//     return list[5];
//   }
// }

// maslahatBering(59)
//   .then((data) => {
//     console.log("Javobi:", data);
//   })
//   .catch((err) => {
//     console.log("ERROR:", err);
//   });
// async function run() {
//   let javob = await maslahatBering(10);
//   console.log(javob);
//   javob = await maslahatBering(20);
//   console.log(javob);
//   javob = await maslahatBering(100);
//   console.log(javob);
// }

// run();

async function maslahatBering(a) {
  if (typeof a !== "number") throw new Error("iltimos raqam kriting");
  else if (a <= 20) return list[0];
  else if (a > 20 && a <= 30) return list[1];
  else if (a > 30 && a <= 40) return list[2];
  else if (a > 40 && a <= 50) return list[3];
  else if (a <= 60) return (null, list[4]);
  else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(list[5]);
      }, 5000);
    });
  }
}
async function run() {
  let javob = await maslahatBering(10);
  console.log(javob);
  javob = await maslahatBering(100);
  console.log(javob);
  javob = await maslahatBering(50);
  console.log(javob);
}

run();
