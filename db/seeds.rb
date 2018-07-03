Customer.create(
  first_name: 'Marge',
  last_name: 'Simpson',
  email: 'marge@evergreenterrace.com',
  phone: '13338594356'
)
Customer.create(
  first_name: 'Bart',
  last_name: 'Simpson',
  email: 'elbarto@caramba.com',
  phone: '13338537691'
)
Customer.create(
  first_name: 'Homer',
  last_name: 'Simpson',
  email: 'homer@doeh.com',
  phone: '13338926094'
)
AppointmentTime.create(time: '10:30')
AppointmentTime.create(time: '12:00')
AppointmentTime.create(time: '14:00')
Appointment.create(customer_id: 2, appointment_time_id: 2, date: '2018-07-15')
Appointment.create(customer_id: 2, appointment_time_id: 3, date: '2018-07-25')
Appointment.create(customer_id: 3, appointment_time_id: 1, date: '2018-08-2')
