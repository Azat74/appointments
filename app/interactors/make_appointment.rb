class MakeAppointment
  include Interactor::Organizer

  organize CreateAppointment, SendAppointmentNotification
end
