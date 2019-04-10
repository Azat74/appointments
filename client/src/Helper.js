import dayjs from 'dayjs';

export function formatAppointment(appointment) {
  let time = dayjs(appointment.attributes.time).format('HH:mm');
  let date = dayjs(appointment.attributes['working-day'].date)
    .format('MMMM D');
  return { date, time }
}
