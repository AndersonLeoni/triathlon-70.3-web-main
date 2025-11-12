/* 70.3 – Plano completo (20 semanas × 7 dias) */
const PLAN = [
  // ---------- WEEK 1 ----------
  { id:'w1-mon', week:1, day:'Seg', title:'8×2 min Run / 1 min Walk' },
  { id:'w1-tue', week:1, day:'Ter', title:'Easy Cycle 20 min' },
  { id:'w1-wed', week:1, day:'Qua', title:'10×25 m Swim (30 s rests)' },
  { id:'w1-thu', week:1, day:'Qui', title:'Rest Day' },
  { id:'w1-fri', week:1, day:'Sex', title:'4×5 min Run / 2 min Walk + 2 mi Run' },
  { id:'w1-sat', week:1, day:'Sáb', title:'10×50 m Swim (45 s rests)' },
  { id:'w1-sun', week:1, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 2 ----------
  { id:'w2-mon', week:2, day:'Seg', title:'Run 3 mi (Zone 2-3)' },
  { id:'w2-tue', week:2, day:'Ter', title:'Easy Cycle 30 min' },
  { id:'w2-wed', week:2, day:'Qua', title:'5×100 m Swim (60 s rests)' },
  { id:'w2-thu', week:2, day:'Qui', title:'Rest Day' },
  { id:'w2-fri', week:2, day:'Sex', title:'3.5 mi Run (non-stop)' },
  { id:'w2-sat', week:2, day:'Sáb', title:'Swim 10 min (non-stop)' },
  { id:'w2-sun', week:2, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 3 ----------
  { id:'w3-mon', week:3, day:'Seg', title:'Run 3 mi (Zone 2-3)' },
  { id:'w3-tue', week:3, day:'Ter', title:'Easy Cycle 45 min' },
  { id:'w3-wed', week:3, day:'Qua', title:'10×50 m Zone 4 Swim (60 s rests)' },
  { id:'w3-thu', week:3, day:'Qui', title:'Rest Day' },
  { id:'w3-fri', week:3, day:'Sex', title:'3.5 mi Run (non-stop)' },
  { id:'w3-sat', week:3, day:'Sáb', title:'Cycle 10×2 min (Zone 4) / 1 min Rec' },
  { id:'w3-sun', week:3, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 4 ----------
  { id:'w4-mon', week:4, day:'Seg', title:'Easy Run 4 mi + 4×75 m Strides' },
  { id:'w4-tue', week:4, day:'Ter', title:'Easy Cycle 50 min' },
  { id:'w4-wed', week:4, day:'Qua', title:'Easy Swim 20 min (non-stop)' },
  { id:'w4-thu', week:4, day:'Qui', title:'Rest Day' },
  { id:'w4-fri', week:4, day:'Sex', title:'3 mi Run 10×1 min (Z4)/1 min jog' },
  { id:'w4-sat', week:4, day:'Sáb', title:'Brick 15 min Swim + 45 min Cycle (Z3)' },
  { id:'w4-sun', week:4, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 5 ----------
  { id:'w5-mon', week:5, day:'Seg', title:'Easy Run 4.5 mi + 4×75 m Strides' },
  { id:'w5-tue', week:5, day:'Ter', title:'Easy Cycle 60 min' },
  { id:'w5-wed', week:5, day:'Qua', title:'2×300 m Zone 3 Swim (90 s rests)' },
  { id:'w5-thu', week:5, day:'Qui', title:'Rest Day' },
  { id:'w5-fri', week:5, day:'Sex', title:'Easy Swim 20 min (non-stop)' },
  { id:'w5-sat', week:5, day:'Sáb', title:'Brick 30 min Cycle + 15 min Run' },
  { id:'w5-sun', week:5, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 6 ----------
  { id:'w6-mon', week:6, day:'Seg', title:'Easy Run 5 mi + 4×75 m Strides' },
  { id:'w6-tue', week:6, day:'Ter', title:'Easy Cycle 70 min' },
  { id:'w6-wed', week:6, day:'Qua', title:'3×400 m Zone 3 Swim (90 s rests)' },
  { id:'w6-thu', week:6, day:'Qui', title:'Rest Day' },
  { id:'w6-fri', week:6, day:'Sex', title:'1000 m Zone 2 Swim' },
  { id:'w6-sat', week:6, day:'Sáb', title:'Swim 500 m + Cycle 10 mi + Run 2 mi' },
  { id:'w6-sun', week:6, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 7 ----------
  { id:'w7-mon', week:7, day:'Seg', title:'Easy Run 5.5 mi + 4×75 m Strides' },
  { id:'w7-tue', week:7, day:'Ter', title:'Easy Cycle 75 min' },
  { id:'w7-wed', week:7, day:'Qua', title:'4×400 m Zone 3 Swim (90 s rests)' },
  { id:'w7-thu', week:7, day:'Qui', title:'Rest Day' },
  { id:'w7-fri', week:7, day:'Sex', title:'Brick 45 min Cycle (Z2) + 15 min Run (Z3)' },
  { id:'w7-sat', week:7, day:'Sáb', title:'Cycle 5×3 min (Z4) / 1 min Rec' },
  { id:'w7-sun', week:7, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 8 ----------
  { id:'w8-mon', week:8, day:'Seg', title:'Easy Run 6 mi + 4×75 m Strides' },
  { id:'w8-tue', week:8, day:'Ter', title:'Cycle 40 min (Z2)' },
  { id:'w8-wed', week:8, day:'Qua', title:'Swim 20 min (Z2)' },
  { id:'w8-thu', week:8, day:'Qui', title:'Rest Day' },
  { id:'w8-fri', week:8, day:'Sex', title:'20 min Easy Run/Cycle' },
  { id:'w8-sat', week:8, day:'Sáb', title:'Race Simulation (Sprint)' },
  { id:'w8-sun', week:8, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 9 ----------
  { id:'w9-mon', week:9, day:'Seg', title:'Easy Run 5 mi + 4×75 m Strides' },
  { id:'w9-tue', week:9, day:'Ter', title:'Cycle 15 mi (Z2-3)' },
  { id:'w9-wed', week:9, day:'Qua', title:'6×200 m Zone 3 Swim (90 s)' },
  { id:'w9-thu', week:9, day:'Qui', title:'Rest Day' },
  { id:'w9-fri', week:9, day:'Sex', title:'Cycle 18 mi Easy' },
  { id:'w9-sat', week:9, day:'Sáb', title:'Swim 800 m + 4×25 m Sprints' },
  { id:'w9-sun', week:9, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 10 ----------
  { id:'w10-mon', week:10, day:'Seg', title:'Easy Run 7 mi + 4×75 m Strides' },
  { id:'w10-tue', week:10, day:'Ter', title:'Cycle 20 mi Easy' },
  { id:'w10-wed', week:10, day:'Qua', title:'3×500 m Zone 3 Swim + 4×25 m' },
  { id:'w10-thu', week:10, day:'Qui', title:'Rest Day' },
  { id:'w10-fri', week:10, day:'Sex', title:'Brick 60 min Cycle (Z2) + 30 min Run (Z3)' },
  { id:'w10-sat', week:10, day:'Sáb', title:'Cycle 25 mi Tempo' },
  { id:'w10-sun', week:10, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 11 ----------
  { id:'w11-mon', week:11, day:'Seg', title:'Easy Run 8 mi + 4×75 m Strides' },
  { id:'w11-tue', week:11, day:'Ter', title:'Cycle 25 mi (Z2) + 2×20 min (Z3)' },
  { id:'w11-wed', week:11, day:'Qua', title:'Swim 1000 m Easy' },
  { id:'w11-thu', week:11, day:'Qui', title:'Rest Day' },
  { id:'w11-fri', week:11, day:'Sex', title:'Run 6 mi 2×10 min Tempo' },
  { id:'w11-sat', week:11, day:'Sáb', title:'8×200 m Z3-4 Swim' },
  { id:'w11-sun', week:11, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 12 ----------
  { id:'w12-mon', week:12, day:'Seg', title:'Easy Run 8 mi + 4×75 m Strides' },
  { id:'w12-tue', week:12, day:'Ter', title:'Cycle 30 mi + 10×3 min (Z4)' },
  { id:'w12-wed', week:12, day:'Qua', title:'Swim 1200 m + 4×25 m' },
  { id:'w12-thu', week:12, day:'Qui', title:'Rest Day' },
  { id:'w12-fri', week:12, day:'Sex', title:'Easy Cycle 20 min' },
  { id:'w12-sat', week:12, day:'Sáb', title:'Swim 1200 m + Cycle 25 mi + Run 5 mi' },
  { id:'w12-sun', week:12, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 13 ----------
  { id:'w13-mon', week:13, day:'Seg', title:'Run 5 mi 10×90 s (Z4)' },
  { id:'w13-tue', week:13, day:'Ter', title:'Cycle 75 min (Z2) + 2×20 min (Z3)' },
  { id:'w13-wed', week:13, day:'Qua', title:'Swim 1500 m Zone 2' },
  { id:'w13-thu', week:13, day:'Qui', title:'Rest Day' },
  { id:'w13-fri', week:13, day:'Sex', title:'Run 10 mi + 4×75 m Strides' },
  { id:'w13-sat', week:13, day:'Sáb', title:'Swim 5×300 m (Z4) + 4×25 m' },
  { id:'w13-sun', week:13, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 14 ----------
  { id:'w14-mon', week:14, day:'Seg', title:'Run 10 mi + 4×75 m Strides' },
  { id:'w14-tue', week:14, day:'Ter', title:'Cycle 35 mi + 10×3 min (Z4)' },
  { id:'w14-wed', week:14, day:'Qua', title:'5×400 m Z3 Swim (90 s)' },
  { id:'w14-thu', week:14, day:'Qui', title:'Rest Day' },
  { id:'w14-fri', week:14, day:'Sex', title:'Swim 1500 m Zone 2' },
  { id:'w14-sat', week:14, day:'Sáb', title:'Easy Cycle 25 mi' },
  { id:'w14-sun', week:14, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 15 ----------
  { id:'w15-mon', week:15, day:'Seg', title:'Run 12 mi + 4×75 m Strides' },
  { id:'w15-tue', week:15, day:'Ter', title:'Cycle 40 mi + 10×3 min (Z4)' },
  { id:'w15-wed', week:15, day:'Qua', title:'4×500 m Z3 Swim (90 s)' },
  { id:'w15-thu', week:15, day:'Qui', title:'Rest Day' },
  { id:'w15-fri', week:15, day:'Sex', title:'Run 5 mi 10×90 s (Z4)' },
  { id:'w15-sat', week:15, day:'Sáb', title:'Brick 1200 m Swim + 20 mi Cycle' },
  { id:'w15-sun', week:15, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 16 ----------
  { id:'w16-mon', week:16, day:'Seg', title:'Easy Run 8 mi + 4×75 m Strides' },
  { id:'w16-tue', week:16, day:'Ter', title:'Cycle 60 min 10×3 min (Z4)' },
  { id:'w16-wed', week:16, day:'Qua', title:'Swim 30 min Zone 2' },
  { id:'w16-thu', week:16, day:'Qui', title:'Rest Day' },
  { id:'w16-fri', week:16, day:'Sex', title:'20 min Easy Run/Cycle' },
  { id:'w16-sat', week:16, day:'Sáb', title:'Run Half Marathon' },
  { id:'w16-sun', week:16, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 17 ----------
  { id:'w17-mon', week:17, day:'Seg', title:'Run 5.5 mi + 4×75 m Strides' },
  { id:'w17-tue', week:17, day:'Ter', title:'Cycle 45 mi + 10×3 min (Z4)' },
  { id:'w17-wed', week:17, day:'Qua', title:'Swim 1800 m Zone 2' },
  { id:'w17-thu', week:17, day:'Qui', title:'Rest Day' },
  { id:'w17-fri', week:17, day:'Sex', title:'Cycle 60 min 3×10 min Tempo' },
  { id:'w17-sat', week:17, day:'Sáb', title:'Swim 6×300 m (Z3) + 4×25 m' },
  { id:'w17-sun', week:17, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 18 ----------
  { id:'w18-mon', week:18, day:'Seg', title:'Run 12 mi + 4×75 m Strides' },
  { id:'w18-tue', week:18, day:'Ter', title:'Cycle 75 min (Z2) + 2×20 min (Z3)' },
  { id:'w18-wed', week:18, day:'Qua', title:'4×500 m Z3 Swim (90 s)' },
  { id:'w18-thu', week:18, day:'Qui', title:'Rest Day' },
  { id:'w18-fri', week:18, day:'Sex', title:'Swim 2000 m Zone 2' },
  { id:'w18-sat', week:18, day:'Sáb', title:'Easy Cycle 60 mi' },
  { id:'w18-sun', week:18, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 19 ----------
  { id:'w19-mon', week:19, day:'Seg', title:'Run 10 mi + 4×75 m Strides' },
  { id:'w19-tue', week:19, day:'Ter', title:'Cycle 60 min 10×3 min (Z4)' },
  { id:'w19-wed', week:19, day:'Qua', title:'2×1000 m Z3 Swim (90 s)' },
  { id:'w19-thu', week:19, day:'Qui', title:'Rest Day' },
  { id:'w19-fri', week:19, day:'Sex', title:'Run 6 mi 12×45 s (Z4)' },
  { id:'w19-sat', week:19, day:'Sáb', title:'Brick 1500 m Swim + 30 mi Cycle' },
  { id:'w19-sun', week:19, day:'Dom', title:'Rest Day' },

  // ---------- WEEK 20 ----------
  { id:'w20-mon', week:20, day:'Seg', title:'Run 6 mi + 4×75 m Strides' },
  { id:'w20-tue', week:20, day:'Ter', title:'Cycle 50 min (Z2)' },
  { id:'w20-wed', week:20, day:'Qua', title:'Swim 30 min Zone 2' },
  { id:'w20-thu', week:20, day:'Qui', title:'Rest Day' },
  { id:'w20-fri', week:20, day:'Sex', title:'20 min Easy Run/Cycle' },
  { id:'w20-sat', week:20, day:'Sáb', title:'Race Day!' },
  { id:'w20-sun', week:20, day:'Dom', title:'Rest Day' }
];
