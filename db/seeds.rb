User.create(
  first_name: 'Marge',
  last_name: 'Simpson',
  email: 'marge@evergreenterrace.com',
  phone: '13338594356',
  password: 'margeee',
  uid: 'marge@evergreenterrace.com'
)
User.create(
  first_name: 'Bart',
  last_name: 'Simpson',
  email: 'elbarto@caramba.com',
  phone: '13338537691',
  password: 'elbarto',
  uid: 'elbarto@caramba.com'
)
User.create(
  first_name: 'Homer',
  last_name: 'Simpson',
  email: 'homer@doeh.com',
  is_admin: true,
  phone: '13338926094',
  password: '654321',
  uid: 'homer@doeh.com'
)
User.create(
  first_name: 'Montgomery',
  last_name: 'Burns',
  email: 'mrburns@richest.com',
  is_admin: true,
  phone: '19999999999',
  password: '123456',
  uid: 'mrburns@richest.com'
)

WorkingDay.create(
  date: '2018-08-15'
)

WorkingDay.create(
  date: '2018-08-25'
)

WorkingDay.create(
  date: '2018-09-02'
)

WorkingDay.create(
  date: '2018-09-12'
)

Appointment.create(user_id: 1, working_day_id: 1, time: '09:00')
Appointment.create(user_id: 1, working_day_id: 2, time: '11:00')
Appointment.create(user_id: 1, working_day_id: 4, time: '18:00')
Appointment.create(user_id: 1, working_day_id: 3, time: '20:00')
