INSERT INTO users (name, email, password)
VALUES ('Bobby Brown', 'bobby@example.com', 'password');
INSERT INTO users (name, email, password)
VALUES ('Sergey Yesenin', 'sergey@example.com', 'password');
INSERT INTO users (name, email, password)
VALUES ('Nick Cage', 'nick@example.com', 'password');
INSERT INTO users (name, email, password)
VALUES ('John Dough', 'dough@example.com', 'password');

INSERT INTO tracks (user_id, title, category, tags, description, published)
VALUES (1, 'My Prerogative', 'Disco', 'dance', 'The only disco beat you will ever need', FALSE);
INSERT INTO tracks (user_id, title, category, tags, description, published)
VALUES (1, 'Every Little Step', 'House', 'dance', 'The only house beat you will ever need', TRUE);
INSERT INTO tracks (user_id, title, category, tags, description, published)
VALUES (2, 'Letter to Mother', 'Hip Hop', 'rap', 'You are still alive, my granny', FALSE);
INSERT INTO tracks (user_id, title, category, tags, description, published)
VALUES (2, 'To Pushkin', 'Hip Hop', 'rap', 'Ode to Pushkin, my dudes', FALSE);
INSERT INTO tracks (user_id, title, category, tags, description, published)
VALUES (3, 'Wicker Man', 'Techno', 'hard', 'Not the bees!', TRUE);
INSERT INTO tracks (user_id, title, category, tags, description, published)
VALUES (4, 'Jane Dough', 'EDM', 'dance', 'Faster than light and faster than time', TRUE);

INSERT INTO sessions (user_id, track_id) VALUES (1, 1);
INSERT INTO sessions (user_id, track_id) VALUES (1, 2);
INSERT INTO sessions (user_id, track_id) VALUES (2, 3);
INSERT INTO sessions (user_id, track_id) VALUES (2, 4);
INSERT INTO sessions (user_id, track_id) VALUES (3, 5);
INSERT INTO sessions (user_id, track_id) VALUES (4, 6);

INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
VALUES (1, ARRAY[1, 5, 9, 13], ARRAY[5, 13], ARRAY[1, 3, 5, 7, 9, 11, 13, 15], ARRAY[15]);
INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
VALUES (2, ARRAY[1, 5, 9, 13], ARRAY[5, 13], ARRAY[1, 3, 5, 7, 9, 11, 13, 15], ARRAY[15]);
INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
VALUES (3, ARRAY[1, 3, 9, 11], ARRAY[5, 13], ARRAY[1, 3, 5, 7, 9, 11, 13, 15], ARRAY[15]);
INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
VALUES (4, ARRAY[1, 3, 9, 11], ARRAY[5, 13], ARRAY[1, 3, 5, 7, 9, 11, 13, 15], ARRAY[15]);
INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
VALUES (5, ARRAY[1, 5, 9, 13], ARRAY[5, 13], ARRAY[1, 3, 5, 7, 9, 11, 13, 15], ARRAY[15]);
INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
VALUES (6, ARRAY[1, 5, 9, 13], ARRAY[5, 13], ARRAY[1, 3, 5, 7, 9, 11, 13, 15], ARRAY[15]);

INSERT INTO bass_sequence (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2) 
VALUES (1, ARRAY[1, 2, 5, 10, 16], ARRAY[3], ARRAY[4], ARRAY[7], ARRAY[11], ARRAY[9], ARRAY[15], ARRAY[14]);
INSERT INTO bass_sequence (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2) 
VALUES (2, ARRAY[1, 3, 5, 7, 15], ARRAY[4], ARRAY[2], ARRAY[6], ARRAY[10], ARRAY[8], ARRAY[11], ARRAY[12]);
INSERT INTO bass_sequence (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2) 
VALUES (3, ARRAY[1, 3, 4, 5], ARRAY[6], ARRAY[2], ARRAY[6], ARRAY[8], ARRAY[12], ARRAY[9], ARRAY[14]);
INSERT INTO bass_sequence (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2) 
VALUES (4, ARRAY[1, 2, 4, 7], ARRAY[3], ARRAY[5], ARRAY[6], ARRAY[8], ARRAY[9], ARRAY[12], ARRAY[14]);
INSERT INTO bass_sequence (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2) 
VALUES (5, ARRAY[1, 3, 4, 8], ARRAY[5], ARRAY[12], ARRAY[14], ARRAY[10], ARRAY[9], ARRAY[6], ARRAY[2]);
INSERT INTO bass_sequence (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2) 
VALUES (6, ARRAY[1, 4, 6, 7], ARRAY[2], ARRAY[8], ARRAY[10], ARRAY[12], ARRAY[11], ARRAY[5], ARRAY[3]);

INSERT INTO synth_sequence (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4) 
VALUES (1, ARRAY[1, 2, 5, 10, 16], ARRAY[3], ARRAY[4], ARRAY[7], ARRAY[11], ARRAY[9], ARRAY[15], ARRAY[14]);
INSERT INTO synth_sequence (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4) 
VALUES (2, ARRAY[1, 3, 5, 7, 15], ARRAY[4], ARRAY[2], ARRAY[6], ARRAY[10], ARRAY[8], ARRAY[11], ARRAY[12]);
INSERT INTO synth_sequence (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4) 
VALUES (3, ARRAY[1, 3, 4, 5], ARRAY[6], ARRAY[2], ARRAY[6], ARRAY[8], ARRAY[12], ARRAY[9], ARRAY[14]);
INSERT INTO synth_sequence (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4) 
VALUES (4, ARRAY[1, 2, 4, 7], ARRAY[3], ARRAY[5], ARRAY[6], ARRAY[8], ARRAY[9], ARRAY[12], ARRAY[14]);
INSERT INTO synth_sequence (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4) 
VALUES (5, ARRAY[1, 3, 4, 8], ARRAY[5], ARRAY[12], ARRAY[14], ARRAY[10], ARRAY[9], ARRAY[6], ARRAY[2]);
INSERT INTO synth_sequence (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4) 
VALUES (6, ARRAY[1, 4, 6, 7], ARRAY[2], ARRAY[8], ARRAY[10], ARRAY[12], ARRAY[11], ARRAY[5], ARRAY[3]);

INSERT INTO favourites (user_id, track_id) VALUES (1, 1);
INSERT INTO favourites (user_id, track_id) VALUES (1, 2);
INSERT INTO favourites (user_id, track_id) VALUES (2, 3);
INSERT INTO favourites (user_id, track_id) VALUES (3, 4);
INSERT INTO favourites (user_id, track_id) VALUES (4, 5);
INSERT INTO favourites (user_id, track_id) VALUES (4, 5);
INSERT INTO favourites (user_id, track_id) VALUES (4, 6);

