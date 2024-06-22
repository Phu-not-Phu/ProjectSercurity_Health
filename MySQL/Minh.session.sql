create DATABASE health_user_db;

use health_user_db;

CREATE TABLE user(
	userID INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(50),
    encrypted_password VARCHAR(255),
    name VARCHAR(50),
    age float,
    weight_kg float,
    height_meter float,
    is_user_dead boolean,
    refresh_token VARCHAR(255)
);

CREATE TABLE record(
    id INT PRIMARY KEY AUTO_INCREMENT,
    alcohol_concentration DECIMAL(5,2),
    tempature DECIMAL(5,2),
    cordinate VARCHAR(255), -- use google map to check
    speed_per_second float, -- m/s
    heading float, -- 360 dregree
	record_time datetime,
    userID INT,
    
    FOREIGN KEY (userID) REFERENCES user(userID)
);

-- insert zone --
-- user --
INSERT INTO user VALUES (userID, 'Minhhu@fakemail.ching', null, 'Minh', 21, 100, 1.71, 0, null);
INSERT INTO user VALUES (userID, 'Phong@chingchongmail.chong', null, 'Phong', 21, 20, 1.35, 1, null);
INSERT INTO user VALUES (userID, 'Phu@parkynui.com', null, 'Phu', 21, 70, 1.88, 0, null);
INSERT INTO user VALUES (userID, 'QUan@cavemail.com', null, 'Quan', 21000, 80, 1.62, 0, null);

-- fake date --
INSERT INTO record VALUES (id, 0.13, 73.75, '-42.589576,100.45292', 68, 292, '2024-06-14 17:40:25', 1);
INSERT INTO record VALUES (id, 0.05, 53.88, '27.788292,-141.635203', 0, 129, '2024-06-11 04:14:25', 1);
INSERT INTO record VALUES (id, 0.22, 95.96, '50.996753,75.186727', 41, 144, '2024-06-15 08:39:25', 2);
INSERT INTO record VALUES (id, 0.23, 70.31, '57.321243,-178.95776', 75, 48, '2024-06-13 22:42:25', 1);
INSERT INTO record VALUES (id, 0.09, 76.94, '-18.048039,107.937415', 22, 268, '2024-06-11 05:34:25', 1);
INSERT INTO record VALUES (id, 0.2, 49.03, '-26.333467,122.676241', 20, 124, '2024-06-16 02:42:25', 1);
INSERT INTO record VALUES (id, 0.24, 90.64, '77.131287,-129.79765', 112, 316, '2024-06-16 13:16:25', 1);
INSERT INTO record VALUES (id, 0.25, 9.38, '88.666243,-170.65599', 59, 285, '2024-06-15 23:35:25', 2);
INSERT INTO record VALUES (id, 0.13, 26.64, '29.276407,-39.396788', 90, 285, '2024-06-10 01:47:25', 3);
INSERT INTO record VALUES (id, 0.01, 7.63, '89.09481,-128.28166', 106, 246, '2024-06-09 23:02:25', 1);
INSERT INTO record VALUES (id, 0.19, 36.88, '-50.893002,-170.437457', 82, 164, '2024-06-13 21:26:25', 1);
INSERT INTO record VALUES (id, 0.14, 20.07, '-47.452365,-176.765751', 80, 126, '2024-06-09 23:55:25', 4);
INSERT INTO record VALUES (id, 0.22, 14.72, '80.944398,-115.791231', 93, 143, '2024-06-12 09:53:25', 3);
INSERT INTO record VALUES (id, 0.16, 25.85, '-39.94278,61.661925', 22, 277, '2024-06-12 15:57:25', 1);
INSERT INTO record VALUES (id, 0.11, 12.71, '26.640254,115.077993', 37, 140, '2024-06-14 12:54:25', 1);
INSERT INTO record VALUES (id, 0.25, 66.95, '14.283225,-71.392447', 72, 66, '2024-06-12 04:12:25', 1);
INSERT INTO record VALUES (id, 0.17, 8.89, '18.995589,169.225523', 113, 142, '2024-06-14 17:27:25', 4);
INSERT INTO record VALUES (id, 0.05, 67.14, '-40.175106,-115.278231', 46, 180, '2024-06-11 16:10:25', 3);
INSERT INTO record VALUES (id, 0.2, 17.72, '32.489721,-1.990475', 105, 61, '2024-06-12 10:46:25', 2);
INSERT INTO record VALUES (id, 0.03, 29.8, '-57.50958,-131.085724', 40, 27, '2024-06-13 13:11:25', 3);




-- select zone --
SELECT * FROM user WHERE user_email = "phu@danghomp.com";
SELECT * FROM record;


-- drop zone --
Drop table record;
Drop table user;
Drop DATABASE health_user_db;