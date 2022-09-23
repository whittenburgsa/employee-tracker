insert into department(name)
values ("finance"), ("sales");

insert into role (title, salary, department_id)
values ("head of sales", 100000, 2), ("head of finance", 200000, 1);

insert into employee (first_name, last_name, role_id, manager_id)
values ("John", "Doe", 1, null), ("Sarah", "Johnson", 2, 1);

