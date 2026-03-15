-- ============================================
-- ENUM ТИПЫ
-- ============================================

-- Статусы задач
CREATE TYPE task_status AS ENUM (
    'PENDING',       -- задача создана
    'IN_PROGRESS',   -- задача выполняется
    'COMPLETED'      -- задача завершена
);

-- Приоритет задач
CREATE TYPE task_priority AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH'
);

-- Тип смены
CREATE TYPE shift_type AS ENUM (
    'DAY',
    'NIGHT'
);

CREATE TYPE role AS ENUM (
    'worker',      -- Линейный сотрудник (машинист, проводник)
    'brigadier',   -- Бригадир / Мастер участка
    'dispatcher',  -- Диспетчер / Нарядчик
    'hr',          -- Кадровый специалист
    'admin'        -- Системный администратор
)


-- ============================================
-- ТАБЛИЦА КОМАНД
-- ============================================

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,     -- уникальный ID команды
    name TEXT NOT NULL         -- название команды
);

-- ============================================
-- ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ
-- ============================================

CREATE TABLE users (

id SERIAL PRIMARY KEY,         -- уникальный ID пользователя

    username TEXT UNIQUE NOT NULL, -- логин
    password TEXT NOT NULL,        -- пароль

    name TEXT NOT NULL,            -- имя
    surname TEXT,                  -- фамилия
    patronymic TEXT,               -- отчество

    role TEXT NOT NULL,            -- роль

    -- адрес
    city TEXT,
    street TEXT,
    house TEXT,
    apartment TEXT,

    experience INT NOT NULL,       -- опыт работы (лет)
    post TEXT,                     -- должность

    email TEXT UNIQUE NOT NULL,    -- email
    phone TEXT,                    -- телефон
    avatar TEXT DEFAULT '/img/default-avatar.jpg',

    team_id INT REFERENCES teams(id), -- связь с командой

    created_at TIMESTAMP DEFAULT NOW() -- дата создания пользователя
);

-- ============================================
-- ТАБЛИЦА СМЕН
-- ============================================

CREATE TABLE shifts (

    id SERIAL PRIMARY KEY,

    start_time TIMESTAMP NOT NULL, -- начало смены
    end_time TIMESTAMP NOT NULL,   -- конец смены

    type shift_type NOT NULL,      -- тип смены (день/ночь)

    user_id INT NOT NULL REFERENCES users(id) -- сотрудник смены
);
-- ============================================
-- ТАБЛИЦА ЗАДАЧ
-- ============================================

CREATE TABLE tasks (

    id SERIAL PRIMARY KEY,

    title TEXT NOT NULL,           -- название задачи
    description TEXT,              -- описание задачи

    deadline TIMESTAMP NOT NULL,   -- дедлайн

    status task_status NOT NULL,   -- статус
    priority task_priority NOT NULL, -- приоритет

    user_id INT NOT NULL REFERENCES users(id), -- кому назначена задача
    shift_id INT REFERENCES shifts(id),        -- в какой смене выполняется

    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ТАБЛИЦА ОТЧЕТОВ
-- ============================================

CREATE TABLE reports (

    id SERIAL PRIMARY KEY,

    title TEXT NOT NULL,           -- название отчета
    content TEXT,                  -- содержимое отчета

    owner_id INT NOT NULL REFERENCES users(id), -- автор отчета

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ВЛОЖЕНИЯ
-- ============================================

CREATE TABLE attachments (

    id SERIAL PRIMARY KEY,

    file_path TEXT NOT NULL,

    report_id INT NOT NULL REFERENCES reports(id)
);

-- ============================================
-- УВЕДОМЛЕНИЯ
-- ============================================

CREATE TABLE notifications (

    id SERIAL PRIMARY KEY,

    title TEXT NOT NULL,
    details TEXT,

    read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ИНДЕКСЫ
-- ============================================

CREATE INDEX idx_users_team ON users(team_id);
CREATE INDEX idx_tasks_user ON tasks(user_id);
CREATE INDEX idx_tasks_shift ON tasks(shift_id);
CREATE INDEX idx_shifts_user ON shifts(user_id);
CREATE INDEX idx_reports_owner ON reports(owner_id);

-- ============================================
-- ДАННЫЕ
-- ============================================

-- Команды
INSERT INTO teams(name) VALUES
('Backend'),
('Frontend'),
('DevOps'),
('QA'),
('Management');

-- Пользователи
INSERT INTO users
(username,password,name,surname,patronymic,city,street,house,apartment,experience,post,email,phone,team_id)
VALUES
('ivan','12345','Ivan','Ivanov','Ivanovich','Berlin','Alexanderplatz','10','5',5,'Backend Developer','ivan@mail.com','1111111',1),
('petr','12345','Petr','Petrov','Petrovich','Berlin','Potsdamer Platz','20','11',3,'Frontend Developer','petr@mail.com','2222222',2),
('anna','12345','Anna','Smirnova','Sergeevna','Berlin','Friedrichstrasse','7','44',7,'DevOps Engineer','anna@mail.com','3333333',3),
('sergey','12345','Sergey','Sidorov','Ivanovich','Berlin','Karl Marx','15','9',4,'QA Engineer','sergey@mail.com','4444444',4),
('alex','12345','Alex','Kozlov','Petrovich','Berlin','Unter den Linden','3','2',10,'Project Manager','alex@mail.com','5555555',5);


-- Смены
INSERT INTO shifts(start_time,end_time,type,user_id) VALUES
('2026-03-15 08:00:00','2026-03-15 20:00:00','DAY',1),
('2026-03-15 20:00:00','2026-03-16 08:00:00','NIGHT',2),
('2026-03-16 08:00:00','2026-03-16 20:00:00','DAY',3),
('2026-03-16 20:00:00','2026-03-17 08:00:00','NIGHT',4),
('2026-03-17 08:00:00','2026-03-17 20:00:00','DAY',5);

-- Задачи
INSERT INTO tasks
(title,description,deadline,status,priority,user_id,shift_id)
VALUES
('Fix login bug','Error during login','2026-03-20','IN_PROGRESS','HIGH',1,1),
('Create landing page','New landing UI','2026-03-25','PENDING','MEDIUM',2,2),
('Setup CI/CD','GitHub Actions setup','2026-03-18','IN_PROGRESS','HIGH',3,3),
('Write API tests','Testing backend API','2026-03-19','PENDING','MEDIUM',4,4),
('Prepare project roadmap','Planning next sprint','2026-03-30','COMPLETED','LOW',5,5);

-- Отчеты
INSERT INTO reports(title,content,owner_id) VALUES
('Backend report','Backend tasks completed',1),
('Frontend report','UI improvements done',2),
('DevOps report','Deployment successful',3);

-- Вложения
INSERT INTO attachments(file_path,report_id) VALUES
('/files/backend_report.pdf',1),
('/files/frontend_report.pdf',2),
('/files/devops_report.pdf',3);

-- Уведомления
INSERT INTO notifications(title,details) VALUES
('New Task Assigned','You have received a new task'),
('Server Maintenance','Server restart scheduled tonight'),
('Deployment Completed','Production updated successfully');