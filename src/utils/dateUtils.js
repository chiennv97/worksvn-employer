import moment from 'moment';

export const formatDate = (date) => moment.unix(date / 1000).format('DD/MM/YYYY');

export const formatDateTime = (dateTime) => moment.unix(dateTime / 1000).format('DD/MM/YYYY HH:mm');

export const formatDateToTimeStamp = (date) => moment(date, 'DD/MM/YYYY', true).format('x');

export const getDateTimeNow = () => moment().valueOf();

export const formatTimeShift = (time) => {
    const hour = Math.floor(time / 60);
    const min = time - hour * 60;
    if (min < 10) {
      return `${hour}:0${min}`;
    }
    return `${hour}:${min}`;
};
