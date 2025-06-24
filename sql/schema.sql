-- Your schema DDL (create table statements etc.) from Assignment 2 goes below here 
DROP TABLE IF EXISTS member CASCADE;
CREATE TABLE member(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

-- Your schema DDL (create table statements etc.) from Assignment 1 goes below here 
DROP TABLE IF EXISTS post;
CREATE TABLE post (
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  member UUID REFERENCES member(id),
  data jsonb
);

DROP TABLE IF EXISTS friend;
CREATE TABLE friend (
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  memberOne UUID REFERENCES member(id),
  memberTwo UUID REFERENCES member(id),
  data jsonb,
  check(memberOne != memberTwo)
);