Customer.create(
  first_name: 'Marge',
  last_name: 'Simpson',
  email: 'marge@evergreenterrace.com',
  phone: '13338594356',
  password: 'margeee'
)
Customer.create(
  first_name: 'Bart',
  last_name: 'Simpson',
  email: 'elbarto@caramba.com',
  phone: '13338537691',
  password: 'elbarto'
)
Customer.create(
  first_name: 'Homer',
  last_name: 'Simpson',
  email: 'homer@doeh.com',
  phone: '13338926094',
  password: '654321'
)
Customer.create(
  first_name: 'Montgomery',
  last_name: 'Burns',
  email: 'mrburns@richest.com',
  phone: '19999999999',
  password: '123456'
)
AppointmentTime.create(time: '10:30')
AppointmentTime.create(time: '12:00')
AppointmentTime.create(time: '15:00')
AppointmentTime.create(time: '13:30')
Appointment.create(customer_id: 2, appointment_time_id: 2, date: '2018-07-15')
Appointment.create(customer_id: 2, appointment_time_id: 3, date: '2018-07-25')
Appointment.create(customer_id: 3, appointment_time_id: 1, date: '2018-08-2')
Appointment.create(customer_id: 4, appointment_time_id: 4, date: '2018-08-12')
