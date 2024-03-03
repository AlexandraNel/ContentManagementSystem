
INSERT INTO department (name) 
VALUES 
('Design'), 
('Content Creation'), 
('Management'), 
('Audio'), 
('Marketing'), 
('IT'), 
('Human Resources'),
('Finance');


INSERT INTO role (title, salary, department_id) 
VALUES
('Graphic Designer', 70000, 1),
('Motion Graphics Designer', 80000, 2),
('Creative Director', 95000, 2),
('3D Animator', 80000, 2),
('Video Editor', 80000, 2),
('Project Manager', 100000, 3),
('Sound Engineer', 75000, 4),
('Audio Director', 95000, 4),
('Storyboard Artist', 70000, 1),
('Production Assistant', 60000, 2),
('Marketing Specialist', 70000, 5),
('Marketing Director', 95000, 5),
('UI/UX Designer', 80000, 1),
('Copywriter', 70000, 2),
('IT Support Specialist', 70000, 6),
('IT Manager', 90000, 6),
('Content Strategist', 70000, 2),
('HR Specialist', 70000, 7),
('HR Manager', 90000, 7),
('Finance Analyst', 80000, 8),
('Finance Director', 95000, 8);


INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
('Alex', 'Johnson', 8, NULL ), 
('Samantha', 'Lee', 6, NULL), 
('Jamie', 'Smith', 12, NULL), 
('Chris', 'Doe', 16, NULL), 
('Jessica', 'Wallace', 19, NULL), 
('Michael', 'Brown', 21, NULL),

('Isabella', 'Wilson', 3, 3),
('James', 'Thomas', 13, 2),
('Ava', 'Harris', 14, 12),
('Mason', 'Clark', 15, 4 ),
('Ella', 'Roberts', 4, 12),
('Liam', 'Rodriguez', 17, 12),
('Emma', 'Lewis', 18, 5),
('Noah', 'White', 5, 12),
('Charlotte', 'Walker', 20, 2),
('Lucas', 'King', 2, 12),
('Emily', 'Davis', 7, 1 ),
('Patrick', 'Green',1, 12 ),
('Olivia', 'Martinez', 9, 12),
('Ethan', 'Taylor', 10, 2),
('Sophia', 'Anderson', 11, 12);
