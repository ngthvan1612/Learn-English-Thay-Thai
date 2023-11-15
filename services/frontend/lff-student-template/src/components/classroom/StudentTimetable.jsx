import React, { useEffect, useState } from "react";
import { Badge, Calendar, Card, Spin } from "antd";
import "./classroom.scss";

import moment from "moment";
import { StudentLessonApi } from "../../api";
import { getCurrentUserId } from "../../authorization";

moment.updateLocale("en", {
  weekdaysMin: [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ],
});

const StudentTimetable = () => {
  const [Lessons, setLessons] = useState([]);
  const studentid = getCurrentUserId();
  const [isLoading, setIsLoading] = useState(true);

  //
  const getListData = (currentDate) => {
    let classes = [];
    for (const lesson of Lessons)
    {
      if (moment(lesson.startTime).format("DD/MM/YYYY") == moment(currentDate).format("DD/MM/YYYY"))
      {
        classes.push({
          classroom: lesson.class.name,
          time: moment(lesson.startTime).format('LT')
        })
      }
    }
    return classes;
  };

  function fetchListLesson() {
    setIsLoading(true);
    StudentLessonApi.getAllLessonsByStudentId(studentid)
      .then((response) => {
        const { message, data: lessons } = response.data;
        const fixedLessons = lessons.map((lesson) => {
          const temp = { ...lesson };
          return temp;
        });
        setLessons(fixedLessons);
        setIsLoading(false);
      })
      .catch((error) => {console.log(error); setIsLoading(false)});
  }

  useEffect(() => {
    fetchListLesson();
  }, []);

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <>
        {listData.map((item) => (
          <div type="primary" key={item}>
            <Badge
              key={item.time}
              status="success"
              text={item.time + " - " + item.classroom}
            />
          </div>
        ))}
      </>
    );
  };

  return <Spin spinning={isLoading}><Calendar dateCellRender={dateCellRender} mode="month" /></Spin>;
};

export default StudentTimetable;
