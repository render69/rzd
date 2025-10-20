const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Инициализация базы данных...');

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Администратор',
      surname: 'Системы',
      patronymic: 'РЖД',
      email: 'admin@rzd.ru',
      phone: '+7 (999) 123-45-67',
      post: 'Системный администратор',
      experience: 5,
      city: 'Москва',
      street: 'Красная площадь',
      house: '1',
      apartment: '1',
      avatar: '/img/default-avatar.jpg'
    }
  });

  console.log('Создан пользователь:', user);

  const team = await prisma.team.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Команда разработки',
    }
  });

  console.log('Создана команда:', team);

  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        title: 'Добро пожаловать в систему РЖД',
        details: 'Вы успешно вошли в личный кабинет сотрудника РЖД'
      }
    }),
    prisma.notification.create({
      data: {
        title: 'Новое расписание',
        details: 'Ваше расписание на следующую неделю обновлено'
      }
    })
  ]);

  console.log('Созданы уведомления:', notifications);

  console.log('Инициализация завершена!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
