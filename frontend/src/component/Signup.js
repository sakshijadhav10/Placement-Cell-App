import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Chip, Autocomplete } from '@mui/material';

const Signup = () => {
  const [userType, setUserType] = useState('student');
  const [educationFields, setEducationFields] = useState([{ domain: '', year: '', branch: '', cgpa: '' }]);
  const [skills, setSkills] = useState([]);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleEducationChange = (index, event) => {
    const values = [...educationFields];
    values[index][event.target.name] = event.target.value;
    setEducationFields(values);
  };

  const handleAddEducationField = () => {
    setEducationFields([...educationFields, { domain: '', year: '', branch: '', cgpa: '' }]);
  };

  const handleRemoveEducationField = (index) => {
    const values = [...educationFields];
    values.splice(index, 1);
    setEducationFields(values);
  };

  const handleSkillsChange = (event, newSkills) => {
    setSkills(newSkills);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log('Form submitted with:', { userType, educationFields, skills });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <FormControl fullWidth>
          <InputLabel id="user-type-label">User Type</InputLabel>
          <Select
            labelId="user-type-label"
            value={userType}
            onChange={handleUserTypeChange}
            label="User Type"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </FormControl>
      </div>

      {userType === 'student' && (
        <div>
          <h3>Education Details</h3>
          {educationFields.map((field, index) => (
            <div key={index}>
              <TextField
                label="Domain"
                name="domain"
                value={field.domain}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Year"
                name="year"
                value={field.year}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Branch"
                name="branch"
                value={field.branch}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="CGPA"
                name="cgpa"
                value={field.cgpa}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              {educationFields.length > 1 && (
                <Button onClick={() => handleRemoveEducationField(index)} color="secondary">
                  Remove Education
                </Button>
              )}
            </div>
          ))}
          <Button onClick={handleAddEducationField} color="primary">
            Add Education
          </Button>
        </div>
      )}

      <div>
        <Autocomplete
          multiple
          id="skills-input"
          options={[]}
          freeSolo
          value={skills}
          onChange={handleSkillsChange}
          renderInput={(params) => <TextField {...params} label="Skills" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} key={index} />
            ))
          }
        />
      </div>

      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Signup;
