"use client";

import { useState } from 'react';

export default function ProfileForm() {
  const initialFormData = {
    name: '',
    profilePic: '',
    description: '',
    skills: [{ name: '', rating: 1 }],
    projects: [],
    experiences: [],
    resumeURL: '',
    interestedFields: [{ field: '' }],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);

      if (result.message === 'Message received!') {
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile Form</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
      <input type="url" name="profilePic" placeholder="Profile Pic URL" value={formData.profilePic} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 mb-2 border rounded"></textarea>
      
      <label>Skills:</label>
      {formData.skills.map((skill, index) => (
        <div key={index} className="flex mb-2">
          <input type="text" placeholder="Skill" value={skill.name} onChange={(e) => {
            const newSkills = [...formData.skills];
            newSkills[index].name = e.target.value;
            setFormData({ ...formData, skills: newSkills });
          }} className="w-full p-2 border rounded" required />
          <input type="number" placeholder="Rating" value={skill.rating} onChange={(e) => {
            const newSkills = [...formData.skills];
            newSkills[index].rating = e.target.value;
            setFormData({ ...formData, skills: newSkills });
          }} className="ml-2 p-2 border rounded" min="1" max="5" required />
        </div>
      ))}
      <button type="button" onClick={() => setFormData({ ...formData, skills: [...formData.skills, { name: '', rating: 1 }] })} className="mb-2 p-2 border rounded bg-blue-500 text-white">Add Skill</button>

      <label>Projects (Optional):</label>
      {formData.projects.map((project, index) => (
        <div key={index} className="mb-2">
          <input type="text" placeholder="Project Name" value={project.name} onChange={(e) => {
            const newProjects = [...formData.projects];
            newProjects[index].name = e.target.value;
            setFormData({ ...formData, projects: newProjects });
          }} className="w-full p-2 border rounded" />
          <input type="url" placeholder="Project URL" value={project.url} onChange={(e) => {
            const newProjects = [...formData.projects];
            newProjects[index].url = e.target.value;
            setFormData({ ...formData, projects: newProjects });
          }} className="w-full p-2 mt-2 border rounded" />
          <input type="url" placeholder="Project Image URL" value={project.image} onChange={(e) => {
            const newProjects = [...formData.projects];
            newProjects[index].image = e.target.value;
            setFormData({ ...formData, projects: newProjects });
          }} className="w-full p-2 mt-2 border rounded" />
        </div>
      ))}
      <button type="button" onClick={() => setFormData({ ...formData, projects: [...formData.projects, { name: '', url: '', image: '' }] })} className="mb-2 p-2 border rounded bg-blue-500 text-white">Add Project</button>

      <label>Experience (Optional):</label>
      {formData.experiences.map((exp, index) => (
        <div key={index} className="mb-2">
          <input type="text" placeholder="Company Name" value={exp.companyName} onChange={(e) => {
            const newExp = [...formData.experiences];
            newExp[index].companyName = e.target.value;
            setFormData({ ...formData, experiences: newExp });
          }} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Role" value={exp.role} onChange={(e) => {
            const newExp = [...formData.experiences];
            newExp[index].role = e.target.value;
            setFormData({ ...formData, experiences: newExp });
          }} className="w-full p-2 mt-2 border rounded" />
          <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => {
            const newExp = [...formData.experiences];
            newExp[index].duration = e.target.value;
            setFormData({ ...formData, experiences: newExp });
          }} className="w-full p-2 mt-2 border rounded" />
        </div>
      ))}
      <button type="button" onClick={() => setFormData({ ...formData, experiences: [...formData.experiences, { companyName: '', certificateURL: '', duration: '', role: '' }] })} className="mb-2 p-2 border rounded bg-blue-500 text-white">Add Experience</button>

      <input type="url" name="resumeURL" placeholder="Resume URL" value={formData.resumeURL} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="text" name="interestedFields" placeholder="Interested Fields (e.g., AI, Web Dev)" value={formData.interestedFields.map(f => f.field).join(', ')} onChange={(e) => {
        setFormData({ ...formData, interestedFields: e.target.value.split(',').map(field => ({ field: field.trim() })) });
      }} className="w-full p-2 mb-2 border rounded" />

      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Submit</button>
    </form>
  );
}
