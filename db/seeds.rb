# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Customer.create(first_name: "Bart", last_name: "Simpson", email: "elbarto@caramba.com")
Customer.create(first_name: "Homer", last_name: "Simpson", email: "homer@doeh.com")
AppointmentTime.create(time: "10:30")
AppointmentTime.create(time: "12:00")
Appointment.create(customer_id: 2, appointment_time_id: 2, date: "2018-07-15")
Appointment.create(customer_id: 2, appointment_time_id: 3, date: "2018-07-25")
Appointment.create(customer_id: 3, appointment_time_id: 1, date: "2018-08-2")