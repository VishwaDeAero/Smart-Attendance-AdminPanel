import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getAllLectures } from '../services/lectureService'
import { getAllStudents } from '../services/studentService'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const AttendanceForm = ({ open, onClose, onSubmit }) => {
    const [lectures, setLectures] = useState([])
    const [students, setStudents] = useState([])
    const [formData, setFormData] = useState({
        studentId: '',
        lectureId: '',
        attendedAt: moment(),
    })

    useEffect(() => {
        // Fetch lectures from API
        getAllLectures()
            .then(lectures => {
                setLectures(lectures.data)
            })
            .catch(error => {
                console.error('Error fetching lectures:', error)
            })
        // Fetch students from API
        getAllStudents()
            .then(students => {
                setStudents(students.data)
            })
            .catch(error => {
                console.error('Error fetching students:', error)
            })
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Call the onSubmit function with the form data
        onSubmit(formData)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle align='center' >Mark Attendance (Special Priviledges)</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid2 sm={12} md={12} container spacing={2} mt={2}>
                        <Grid2 xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="studentLabel">Student</InputLabel>
                                <Select
                                    labelId="studentLabel"
                                    id="studentId"
                                    name="studentId"
                                    value={formData.studentId}
                                    label="Student"
                                    onChange={handleChange}
                                >
                                    <MenuItem key={0} value={0} disabled={true}>
                                        Select Student
                                    </MenuItem>
                                    {students.map(student => (
                                        <MenuItem key={student.id} value={student.id}>
                                            {student.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="lectureLabel">Lecture</InputLabel>
                                <Select
                                    labelId="lectureLabel"
                                    id="lectureId"
                                    name="lectureId"
                                    value={formData.lectureId}
                                    label="Lecture"
                                    onChange={handleChange}
                                >
                                    <MenuItem key={0} value={0} disabled={true}>
                                        Select Lecture
                                    </MenuItem>
                                    {lectures.map(lecture => (
                                        <MenuItem key={lecture.id} value={lecture.id}>
                                            {lecture.subject.name} - {moment(lecture.scheduledAt).format('DD/MM/YY HH:mm')}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 xs={12} md={12}>
                            <FormControl fullWidth>
                                <DateTimePicker
                                    id="attendedAt"
                                    name="attendedAt"
                                    label="Date & Time"
                                    maxDateTime={moment().hours(24).minutes(0)} //future datetimess not allowed
                                    value={moment(formData.attendedAt)}
                                    onChange={(event) => { setFormData({ ...formData, "attendedAt": event }) }}
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid2>
                        <Grid2 sm={12} md='auto'>
                            <Button fullWidth type="submit" variant="contained" color="primary" sx={{ width: { sm: '100%', md: 'auto' } }}>
                                Submit
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AttendanceForm