create table if not exists  oauth_client_details (
  client_id varchar(255) not null,
  client_secret varchar(255) not null,
  web_server_redirect_uri varchar(2048) default null,
  scope varchar(255) default null,
  access_token_validity int(11) default null,
  refresh_token_validity int(11) default null,
  resource_ids varchar(1024) default null,
  authorized_grant_types varchar(1024) default null,
  authorities varchar(1024) default null,
  additional_information varchar(4096) default null,
  autoapprove varchar(255) default null,
  primary key (client_id)
) engine=innodb ;

create table if not exists  permission (
  id int(11) not null auto_increment,
  name varchar(512) default null,
  primary key (id),
  unique key name (name)
) engine=innodb ;

create table if not exists role (
  id int(11) not null auto_increment,
  name varchar(255) default null,
  primary key (id),
  unique key name (name)
) engine=innodb ;

create table if not exists  user (
  id int(11) not null auto_increment,
  username varchar(100) not null,
  password varchar(1024) not null,
  email varchar(1024) not null,
  enabled tinyint(4) not null,
  accountNonExpired tinyint(4) not null,
  credentialsNonExpired tinyint(4) not null,
  accountNonLocked tinyint(4) not null,
  primary key (id),
  unique key username (username)
) engine=innodb ;


create table  if not exists permission_role (
  permission_id int(11) default null,
  role_id int(11) default null,
  key permission_id (permission_id),
  key role_id (role_id),
  constraint permission_role_ibfk_1 foreign key (permission_id) references permission (id),
  constraint permission_role_ibfk_2 foreign key (role_id) references role (id)
) engine=innodb ;



create table if not exists role_user (
  role_id int(11) default null,
  user_id int(11) default null,
  key role_id (role_id),
  key user_id (user_id),
  constraint role_user_ibfk_1 foreign key (role_id) references role (id),
  constraint role_user_ibfk_2 foreign key (user_id) references user (id)
) engine=innodb ;


-- token store
create table if not exists oauth_client_token (
  token_id VARCHAR(256),
  token LONG VARBINARY,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256)
);

create table if not exists oauth_access_token (
  token_id VARCHAR(256),
  token LONG VARBINARY,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256),
  authentication LONG VARBINARY,
  refresh_token VARCHAR(256)
);

create table if not exists oauth_refresh_token (
  token_id VARCHAR(256),
  token LONG VARBINARY,
  authentication LONG VARBINARY
);

create table if not exists oauth_code (
  code VARCHAR(256), authentication LONG VARBINARY
);

create table if not exists oauth_approvals (
	userId VARCHAR(256),
	clientId VARCHAR(256),
	scope VARCHAR(256),
	status VARCHAR(10),
	expiresAt TIMESTAMP,
	lastModifiedAt TIMESTAMP
);

-- INSERT INTO oauth_client_details (client_id, client_secret, web_server_redirect_uri, scope, access_token_validity, refresh_token_validity, resource_ids, authorized_grant_types, additional_information) VALUES ('public', '{bcrypt}$2a$10$yL.m7d9U6b4JWDGR38csOefz8xtL1mvISRg6a4VshonH45bJHi0AW', 'http://localhost:8080/code', 'READ,WRITE', '3600', '10000', 'inventory,payment', 'authorization_code,password,refresh_token,implicit', '{}');

--  INSERT INTO PERMISSION (NAME) VALUES
--  ('create'),
--  ('read'),
--  ('update'),
--  ('delete');

--  INSERT INTO role (NAME) VALUES
-- 		('ROLE_admin'),('ROLE_user');

--  INSERT INTO PERMISSION_ROLE (PERMISSION_ID, ROLE_ID) VALUES
--      (1,1), /*create-> admin */
--      (2,1), /* read admin */
--      (3,1), /* update admin */
--      (4,1), /* delete admin */
--      (2,2),  /* read operator */
--      (3,2);  /* update operator */
-- insert into user (id, username,password, email, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked) VALUES ('1', 'madhav','{bcrypt}$2a$10$2LqqUfW1DW9YfVsAL24Wc.4/000nySUDXtAB/IPS9QUiBYcD17.zW', 'madhav@gmail.com', '1', '1', '1', '1');
-- insert into  user (id, username,password, email, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked) VALUES ('2', 'raghav', '{bcrypt}$2a$10$RzuiaRopoCCN/bTJ88JuV.pGgud4fzdfjJM82GX92EInXUp3dXwAi','raghav@gmail.com', '1', '1', '1', '1');

-- INSERT INTO ROLE_USER (ROLE_ID, USER_ID)
--     VALUES
--     (1, 1) /* madhav-admin */,
--     (2, 2) /* raghav-user */ ;