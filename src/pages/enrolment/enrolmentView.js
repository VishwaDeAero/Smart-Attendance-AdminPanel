import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Add, Delete, Search } from '@mui/icons-material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { useParams } from 'react-router-dom'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getAllStudents } from '../../services/studentService'
import EnrolmentForm from '../../components/EnrolmentForm'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { createEnrolment, deleteEnrolment, getEnrolmentsByStudent } from '../../services/enrolmentService'

const EnrolmentView = () => {
    const auth = useAuthHeader()
    const { id } = useParams();
    const [students, setStudents] = useState([])
    const [enrolements, setEnrolments] = useState([])
    const [enrolledIds, setEnrollIds] = useState([])
    const [openEnrollModal, setOpenEnrollModal] = useState(false);

    const [formData, setFormData] = useState({
        studentId: (id)? id: '',
    })

    const handleOpenEnrollModal = () => {
        setOpenEnrollModal(true);
    };

    const handleCloseEnrollModal = () => {
        setOpenEnrollModal(false);
    };

    useEffect(() => {
        // Fetch students from API
        getAllStudents()
            .then(students => {
                console.log(students)
                setStudents(students.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            })
    }, [])

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'subject',
            headerName: 'Subject',
            flex: 3,
            renderCell: (params) => (
                <>{params.row.subject?.name}</>
            ),
        },
        {
            field: 'code',
            headerName: 'Subject Code',
            flex: 2,
            renderCell: (params) => (
                <>{params.row.subject?.code}</>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Enrolled At',
            flex: 2,
            renderCell: (params) => (
                <>{moment(params.value).format('YYYY/MM/DD HH:mm')}</>
            ),
        },
        {
            field: 'actions',
            headerName: 'Action',
            headerAlign: 'center',
            description: 'This column has actions and is not sortable.',
            flex: 1,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton color='error' onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteEnrolment(params.row.id)
                    }}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ]

    const fetchEnrolments = async () => {
        try {
            const enrolmentData = await getEnrolmentsByStudent(formData.studentId, auth)
            if (enrolmentData?.data) {
                setEnrolments(enrolmentData.data)
                const enrolementIds = (enrolmentData.data).map(enrolement => enrolement.subject.id);
                setEnrollIds(enrolementIds)
            }
        } catch (error) {
            console.error('Error fetching enrolments:', error)
        }
        closeAlert()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleDeleteEnrolment = async (id) => {
        showAlert(
            "Are You Sure?",
            "You want to unenrol this subject!",
            "warning",
            true,
            "Yes",
            async () => {
                showLoading()
                try {
                    const enrolmentData = await deleteEnrolment(id, auth)
                    console.log(enrolmentData)
                    fetchEnrolments();
                    showAlert("Subject Unenrolled", `enrolment id:${id} deleted successfully.`, "success")
                } catch (error) {
                    console.error('Error subject unenroll:', error)
                    showAlert("Unenroll Subject Failed", error, "error")
                }
            }
        )
    }

    const handleEnroll = async (data) => {
        handleCloseEnrollModal()
        showLoading()
        try {
            const enrolmentData = await createEnrolment(data, auth)
            fetchEnrolments()
            showAlert("New Enrolment", `New Subject Enrolled Successfully.`, "success")
        } catch (error) {
            console.error(`Error Subject Enroll:`, error)
            showAlert("Enroll Failed", error, "error")
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Subject Enrolments</Typography>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <Grid2 container spacing={2} marginBottom={1}>
                    <Grid2 xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="studentLabel">Student Name</InputLabel>
                            <Select
                                labelId="studentLabel"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                label="Student Name"
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
                    <Grid2 xs={12} md={4} sx={{
                        textAlign: 'start',
                        alignSelf: 'center'
                    }}>
                        <Button variant="contained" endIcon={<Search />} onClick={
                            (e) => {
                                e.stopPropagation()
                                if (formData.studentId) {
                                    showLoading()
                                    fetchEnrolments()
                                }else{
                                    showAlert("No Student Selected","Please select a student first.","error");
                                }
                            }
                        }>
                            Search
                        </Button>
                        <Button variant="contained" sx={{ marginLeft: 2 }} endIcon={<Add />} onClick={
                            (e) => {
                                e.stopPropagation()
                                if (formData.studentId) {
                                    handleOpenEnrollModal()
                                }else{
                                    showAlert("No Student Selected","Please select a student first.","error");
                                }
                            }
                        }>
                            Add New Subject
                        </Button>
                    </Grid2>
                </Grid2>
                <DataTable
                    rows={enrolements}
                    columns={columns}
                />
            </Box>
            <EnrolmentForm open={openEnrollModal} onClose={handleCloseEnrollModal} onSubmit={handleEnroll} studentId={formData.studentId} enrolledIds={enrolledIds} />
        </MainLayout>
    )
}

export default EnrolmentView