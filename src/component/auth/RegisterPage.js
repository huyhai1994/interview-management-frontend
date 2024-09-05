import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ApiService from "../../service/ApiService";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Container, Grid, IconButton, InputAdornment, Link, TextField, Typography} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string().required('Phone Number is required')
    });

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        try {
            const response = await ApiService.registerUser(values);
            if (response.statusCode === 200) {
                resetForm();
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
        setSubmitting(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <Box sx={{mt: 1}}>
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    helperText={<ErrorMessage name="name"/>}
                                />
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={<ErrorMessage name="email"/>}
                                />
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={<ErrorMessage name="password"/>}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phoneNumber"
                                    label="Phone Number"
                                    type="text"
                                    id="phoneNumber"
                                    autoComplete="phoneNumber"
                                    helperText={<ErrorMessage name="phoneNumber"/>}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    disabled={isSubmitting}
                                >
                                    Register
                                </Button>
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default RegisterPage;
