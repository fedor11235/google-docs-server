create table persons ( 
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT u_constraint UNIQUE (login)
);

create table posts (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    person_login VARCHAR(255),
    FOREIGN KEY (person_login) REFERENCES persons(login)
);