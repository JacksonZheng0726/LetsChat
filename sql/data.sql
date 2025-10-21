----- Your insert statements go below here -----
INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','molly@books.com',
    'name','molly member ',
    'pwhash',crypt('mollymember',gen_salt('bf')),
    'roles','["member"]'
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','barbie@books.com',
    'name','barbie buyer',
    'pwhash',crypt('barbiebuyer',gen_salt('bf')),
    'roles','["member"]'
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','sally@books.com',
    'name','sally salesman',
    'pwhash',crypt('sallysalesman',gen_salt('bf')),
    'roles','["member"]'
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','jack@books.com',
    'name','jack buyer',
    'pwhash',crypt('jackbuyer',gen_salt('bf')),
    'roles','["member"]'
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','nick@books.com',
    'name','nick buyer',
    'pwhash',crypt('nickbuyer',gen_salt('bf')),
    'roles','["member"]'
  )
);

INSERT INTO post(member, data)
VALUES (
  (select id from member where data->>'email' = 'molly@books.com'),
  jsonb_build_object(
    'posted', NOW(),
    'content', 'Today is a good day, I like UCSC',
    'image', 'https://www.ucsc.edu/wp-content/uploads/2022/10/campus-and-monterey-bay-scaled.jpg'
  )
);

INSERT INTO friend(memberOne, memberTwo, data) 
VALUES (
  (SELECT id FROM member WHERE data->>'email' = 'molly@books.com'),
  (SELECT id FROM member WHERE data->>'email' = 'barbie@books.com'),
  jsonb_build_object(
    'requestStatus', 'accept',
    'posted', NOW()
  )
);
INSERT INTO friend(memberOne, memberTwo, data) 
VALUES (
  (SELECT id FROM member WHERE data->>'email' = 'molly@books.com'),
  (SELECT id FROM member WHERE data->>'email' = 'nick@books.com'),
  jsonb_build_object(
    'requestStatus', 'waiting',
    'posted', NOW()
  )
);

INSERT INTO post(member, data)
VALUES (
  (select id from member where data->>'email' = 'barbie@books.com'),
  jsonb_build_object(
    'posted', NOW(),
    'content', 'I love the CSE187',
    'image', 'https://miro.medium.com/v2/resize:fit:1400/1*fHrAZJ1_L0Ff9dvVexL5_A.png'
  )
);

INSERT INTO post(member, data)
VALUES (
  (select id from member where data->>'email' = 'nick@books.com'),
  jsonb_build_object(
    'posted', NOW(),
    'content', 'I love USA',
    'image', 'https://www.ucsc.edu/wp-content/uploads/2022/10/campus-and-monterey-bay-scaled.jpg'
  )
);

INSERT INTO post(member, data)
VALUES (
  (select id from member where data->>'email' = 'jack@books.com'),
  jsonb_build_object(
    'posted', NOW(),
    'content', 'I love USA',
    'image', 'https://www.ucsc.edu/wp-content/uploads/2022/10/campus-and-monterey-bay-scaled.jpg'
  )
);

-- SELECT id, data FROM member WHERE id = '18fcf031-10cb-4a7f-8300-55f05e181c35';
-- -- SELECT data->>'name' as name FROM member WHERE id = '61aade26-a032-4546-b6fa-ef52cb38f9c0';

-- -- SELECT id, data->>'name' as name, data->>'email' as email FROM member;
-- Select id, data ->> 'requestStatus' as status FROM friend where data ->> 'requestStatus' = 'waiting'