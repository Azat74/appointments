class MakeAppointment
  include Interactor::Organizer
  # TODO: Disabled temprorary for Heroku, SendAppointmentNotification
  organize CreateAppointment
end
