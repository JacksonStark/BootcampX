const { Pool } = require('pg');

const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

let cohortMonth = process.argv[2];
let maxResults = process.argv[3];

pool.query (`
SELECT DISTINCT teachers.name as teacher_name, cohorts.name as cohort_name
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher_name
LIMIT $2;
`, [`%${cohortMonth}%`, `${maxResults || 5}`])
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort_name}: ${teacher.teacher_name}`)
  })
})
.catch(err => console.log('query error:', err.stack));

