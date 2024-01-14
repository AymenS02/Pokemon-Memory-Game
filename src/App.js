import './App.css';
import React, { useState } from 'react';

function App() {
  const defaultInfo = { name: 'Fill-Name', email: 'blank@gmail.com', phoneNum: '' };
  const defaultEducation = {school: "Fill-School", degree: "Fill-Degree", dataOfStudy: "Fill-Date"};
  const defaultExperience = {company: "Fill-Company", position: "Fill-Position", mainTasks: "Fill-Main-Tasks", dateFrom: "Fill-Date", dateTo: "Fill-Date"};

  const [info, setInfo] = useState(defaultInfo);
  const [ education, setEducation ] = useState(defaultEducation);
  const [ experience, setExperience ] = useState(defaultExperience);
  const [submitted, setSubmitted] = useState(false);

  const handleInfoChange = (event) => {
    const { name, value } = event.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    setEducation((prevEducation) => ({ ...prevEducation, [name]: value }));
  }

  const handleExperienceChange = (event) => {
    const { name, value } = event.target;
    setExperience((prevExperience) => ({ ...prevExperience, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleEdit = (event) => {
    setSubmitted(false);
  }

  return (
    <div className="App">
    <section className="generalInfo">
        <h1>General Information</h1>
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          {!submitted && (<input
            type="text"
            name="name"
            value={info.name}
            onChange={handleInfoChange}
            readOnly={submitted}
            className={submitted ? 'lockedInput' : ''}
          />)}
          {submitted && (<p>{info.name}</p>)}
          <label>Email: </label>
          {!submitted && (<input
            type="text"
            name="email"
            value={info.email}
            onChange={handleInfoChange}
            readOnly={submitted}
            className={submitted ? 'lockedInput' : ''}
          />)}
          {submitted && (<p>{info.email}</p>)}
          <label>Phone Number: </label>
          {!submitted && (
            <input
              type="text"
              name="phoneNum"
              value={info.phoneNum}
              onChange={handleInfoChange}
              readOnly={submitted}
              className={submitted ? 'lockedInput' : ''}
            />
          )}
          {submitted && <p>{info.phoneNum}</p>}
        <h1>Education</h1>
            <label>School: </label>
            {!submitted && (<input
            type="text"
            name="school"
            value={education.school}
            onChange={handleEducationChange}
            readOnly={submitted}
            className={submitted ? 'lockedInput' : ''}
          />)}
          {submitted && (<p>{education.school}</p>)}
            <label>Degree: </label>
            {!submitted && (<input
            type="text"
            name="degree"
            value={education.degree}
            onChange={handleEducationChange}
            readOnly={submitted}
            className={submitted ? 'lockedInput' : ''}
          />)}
          {submitted && (<p>{education.degree}</p>)}
            <label>Date of Study: </label>
            {!submitted && (
              <input
                type="text"
                name="dateOfStudy"
                value={education.dateOfStudy}
                onChange={handleEducationChange}
                readOnly={submitted}
                className={submitted ? 'lockedInput' : ''}
              />
            )}
            {submitted && <p>{education.dateOfStudy}</p>}
        <h1>Experience</h1>
            <label>Company: </label>
            {!submitted && (<input
            type="text"
            name="company"
            value={experience.company}
            onChange={handleExperienceChange}
            readOnly={submitted}
            className={submitted ? 'lockedInput' : ''}
          />)}
          {submitted && (<p>{experience.company}</p>)}
            <label>Position: </label>
            {!submitted && (<input
            type="text"
            name="position"
            value={experience.position}
            onChange={handleExperienceChange}
            readOnly={submitted}
            className={submitted ? 'lockedInput' : ''}
          />)}
          {submitted && (<p>{experience.position}</p>)}
          <label>Main Tasks: </label>
          {!submitted && (
            <input
              type="text"
              name="mainTasks"
              value={experience.mainTasks}
              onChange={handleExperienceChange}
              readOnly={submitted}
              className={submitted ? 'lockedInput' : ''}
            />
          )}
          {submitted && <p>{experience.mainTasks}</p>}
            <label>Date From: </label>
            {!submitted && (
              <input
                type="text"
                name="dateFrom"
                value={experience.dateFrom}
                onChange={handleExperienceChange}
                readOnly={submitted}
                className={submitted ? 'lockedInput' : ''}
              />
            )}
            {submitted && <p>{experience.dateFrom}</p>}

            <label>Date To: </label>
            {!submitted && (
              <input
                type="text"
                name="dateTo"
                value={experience.dateTo}
                onChange={handleExperienceChange}
                readOnly={submitted}
                className={submitted ? 'lockedInput' : ''}
              />
            )}
            {submitted && <p>{experience.dateTo}</p>}
          </form>
          <button onClick={!submitted ? handleSubmit : handleEdit}>{!submitted ? 'Submit' : 'Edit'}</button>
      </section>
    </div>
  );
}

export default App;

