import dayjs from 'dayjs';

export function formatAppointment(appointment, days) {
  const time = dayjs(appointment.attributes.time).format('HH:mm');
  const day_id = appointment.relationships['working-day'].data.id;
  const dayIndex = days.findIndex((day) => day.id === day_id) 
  const date = dayjs(days[dayIndex].date).format('MMMM D');
  return { date, time }
}
