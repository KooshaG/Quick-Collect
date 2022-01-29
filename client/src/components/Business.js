import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { GroupingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2022-01-29';
const schedulerData = [
  { startDate: '2022-01-29T09:45', endDate: '2022-01-29T11:00', title: 'Meeting' },
  { startDate: '2022-01-29T09:45', endDate: '2022-01-29T11:00', title: 'Meeting' },
  { startDate: '2022-01-29T09:45', endDate: '2022-01-29T11:00', title: 'Meeting' },
  { startDate: '2022-01-29T09:45', endDate: '2022-01-29T13:30', title: 'Meeting' },
  { startDate: '2022-01-29T12:00', endDate: '2022-01-29T13:30', title: 'Go to a gym' }
];

export const Business = (props) => {
  return (
    <div>
      <h1>Business Page</h1>
      <Paper>
        <Scheduler data={schedulerData}>
          <ViewState currentDate={currentDate} />
          <DayView startDayHour={9} endDayHour={14} groupOrientation='Vertical' />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
}