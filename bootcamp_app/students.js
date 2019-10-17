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
SELECT students.id as student_id, students.name as student_name, cohort_id, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, [`%${cohortMonth}%`, `${maxResults || 5}`])
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort.`)
  })
})
.catch(err => console.log('query error:', err.stack));

