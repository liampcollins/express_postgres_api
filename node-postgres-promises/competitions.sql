DROP DATABASE IF EXISTS competitions;
CREATE DATABASE competitions;

\c competitions;

CREATE TABLE comps (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  image VARCHAR
);

INSERT INTO comps (name, image)
  VALUES ('competition 1', 'https://www.ethos3.com/wp-content/uploads/2016/01/music-for-presentation.jpg');
