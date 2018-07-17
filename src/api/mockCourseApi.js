import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
    {
    id: "ReactJS",
    title: "React: Introduction",
    watchHref: "https://www.youtube.com/watch?v=jDdPwSh92mw&list=PLWPirh4EWFpHCGrvE6t5vsYBRS1SuivDm",
    authorId: "Tutorials-Point",
    length: "5:54",
    category: "JavaScript"
  },
  {
    id: "ReactJS Props",
    title: "React: Props",
    watchHref: "https://www.youtube.com/watch?v=lf4lTlkP7mM&list=PLWPirh4EWFpHCGrvE6t5vsYBRS1SuivDm&index=8",
    authorId: "Tutorials-Point",
    length: "3:34",
    category: "JavaScript"
  },
   {
    id: "ReactJS Components Life Cycle",
    title: "React: LifeCycle",
    watchHref: "https://www.youtube.com/watch?v=TV33yMetQKA&list=PLWPirh4EWFpHCGrvE6t5vsYBRS1SuivDm&index=12",
    authorId: "Tutorials-Point",
    length: "5:39",
    category: "JavaScript"
  },
  {
    id: "Build Responsive Real World Websites with HTML5 and CSS3",
    title: "Build Responsive Real World Websites with HTML5 and CSS3",
    watchHref: "https://www.udemy.com/courses/search/?q=html5&src=ukw",
    authorId: "Jonas-Schmedtmann",
    length: "12:00:00",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], courses));
      }, delay);
    });
  }

  static saveCourse(course) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          courses.push(course);
        }

        resolve(Object.assign({}, course));
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          course.courseId == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;
