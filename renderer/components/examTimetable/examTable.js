import React from 'react'
import ExamTimeTable from './time-table'
import './exam.css'

//import 'react-big-calendar/lib/css/react-big-calendar.css'
export default () => {
    return(
        <div id="exams" className="exams-container">
            <ExamTimeTable />
        </div>
    );
}