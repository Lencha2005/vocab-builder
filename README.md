# 📘 VocabBuilder

**VocabBuilder** — це сучасний англо-український словник із функціоналом
особистого кабінету, тренуванням слів і відстеженням прогресу. Створено з
використанням Next.js, TypeScript, Redux Toolkit, TailwindCSS та NextAuth.

🔗 [Демо](https://vocab-builder-green.vercel.app/)

🔗
[Макет у Figma](https://www.figma.com/design/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?node-id=0-1)

## Сторінки:

### /login та /register

- Форми логіну та реєстрації
- Використано React Hook Form + Zod
- При успішній авторизації – редірект на /dictionary

![Login page](/public/images/readme/login.png)
![Register page](/public/images/readme/register.png)

### /dictionary – Словник користувача

- Персональний список улюблених
- Можна додати, редагувати чи видалити слово
- Налоштовані сортування, пошук та пагінація

![Dictionary page](/public/images/readme/dictionary.png)
![Add word](/public/images/readme/add.png)

### /recommend – Загальний словник

- Налоштовані сортування, пошук та пагінація
- Можно дадати слово до свого словника

![Recommend page](/public/images/readme/recommend.png)

### /training – Сторінка тренування

- Автоматично підбирає завдання зі слів користувача
- Напрямок можна змінювати: 🇺🇦 → 🇬🇧 або 🇬🇧 → 🇺🇦
- Є індикатор прогресу (візуальний круговий ProgressBar)
- Після проходження показує WellDoneModal з результатами

![Training page](/public/images/readme/training.png)
![Well Done](/public/images/readme/welldone.png)

## ✨ Основні можливості

- 🔐 Авторизація та реєстрація (NextAuth з JWT)
- 📚 Словник користувача з додаванням та редагуванням слів
- 📈 Візуалізація прогресу вивчення кожного слова
- 🧠 Сторінка тренування слів з перевіркою відповідей
- 🔄 Зміна напрямку перекладу (UA → EN або EN → UA)
- 📊 Адаптивний інтерфейс з підтримкою планшетів та мобільних
- 🎯 Фільтрація за категорією, неправильними дієсловами та пошук
- 🪄 Плавна робота без перезавантаження сторінок (App Router)

## 🛠️ Технології

- **Next.js 14 (App Router)**
- **TypeScript**
- **Redux Toolkit**
- **TailwindCSS**
- **NextAuth (JWT)**
- **Zod + React Hook Form**
- **Axios з авторизацією через інтерсептори**
- **MUI (для модалок і прогрес-бара)**

## 📦 Встановлення

- git clone https://github.com/Lencha2005/vocab-builder.git
- cd vocab-builder
- npm install
- npm run dev

## Автор

Lencha2005 – https://github.com/Lencha2005GitHub
