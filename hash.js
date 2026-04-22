const fs = require("fs");
const bcrypt = require("bcrypt");

const filePath = "password.txt";
const testPassword = "bacon";

async function run() {
  try {
    if (!fs.existsSync(filePath)) {
      console.log("Файл не знайдено. Створюємо новий хеш...");

      const password = "bacon"; 
      const saltRounds = 10;

      const hash = await bcrypt.hash(password, saltRounds);

      fs.writeFileSync(filePath, hash);
      console.log("Пароль захешовано і збережено.");
    } else {
      console.log("Файл знайдено. Перевіряємо пароль...");

      const savedHash = fs.readFileSync(filePath, "utf-8");

      const isMatch = await bcrypt.compare(testPassword, savedHash);

      if (isMatch) {
        console.log("Password is correct");
      } else {
        console.log("Password is incorrect");
      }
    }
  } catch (err) {
    console.error("Помилка:", err);
  }
}

run();