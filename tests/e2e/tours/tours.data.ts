export const toursData = {
  login: {
    email: 'balaji@db1008.in',
    password: 'Baljai@#1998',
  },
  times: {
    schedule: '10:00 AM',
    scheduleAlt: '10:30 AM',
    reschedule: '11:00 AM',
  },
  homeTypes: ['House', 'Condo', 'Town House'] as const,
};

export function getTomorrowDate(): number {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getDate();
}

export function getDayAfterTomorrow(): number {
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  return dayAfter.getDate();
}

export function getDayName(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

export function getMonthName(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[date.getMonth()];
}

export function getExpectedDateTimeString(dayOffset: number, time: string): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const dayName = getDayName(date);
  const monthName = getMonthName(date);
  const dayNum = date.getDate();
  return `${dayName}, ${monthName} ${dayNum} - ${time}`;
}

export function getTomorrowDateTimeString(time: string): string {
  return getExpectedDateTimeString(1, time);
}

export function getDayAfterTomorrowDateTimeString(time: string): string {
  return getExpectedDateTimeString(2, time);
}

export function getRandomHomeType(): 'House' | 'Condo' | 'Town House' {
  const randomIndex = Math.floor(Math.random() * toursData.homeTypes.length);
  return toursData.homeTypes[randomIndex];
}
