import React, {useEffect}from 'react';
import { Button, Card, CardContent, TextField, Typography }from '@mui/material';
import { Box } from '@mui/system';
import useForm from '../../Hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import useStateContext from '../../Hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import resetContext from '../../Layout/Layout'


const getFreshModelObject = () => ({
    name: '',
    email: ''
})

export default function Login() {
    const {context, setContext, resetContext} = useStateContext();
    const navigate = useNavigate()

    const{        
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModelObject);

    useEffect(() => {
        resetContext()
    }, [])

    const loginSender = e => {
        e.preventDefault();
        if(validate())
            createAPIEndpoint(ENDPOINTS.participant)
                .post(values)
                .then(res => {
                    setContext({participantId: res.data.id})
                    navigate('/question')
                })
                .catch(err => console.log(err));
    }

    const validate = () => {
        let temp = {};
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Niepoprawny e-mail";
        temp.name = (values.name) != "" ? "" : "Pole nie może być puste";
        setErrors(temp);
        return Object.values(temp).every(x => x == "")
    }

    return (
        <Card>
            <CardContent sx={{textAlign:"Center"}}>
                <Typography variant="h3" sx={{my:3}}>
                    Quiz
                </Typography>
                <Box sx={{
                    '& .MuiTextField-root':{
                        m: 1,
                        width: '90%',
                    }
                    }}>
                    <form noValidate autoComplete="on" onSubmit={loginSender}>
                        <TextField 
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            variant="outlined" 
                            {...(errors.email && {error: true, helperText: errors.email})}/>                 
                        <TextField 
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            variant="outlined" 
                            {...(errors.name && {error: true, helperText: errors.name})}/>    
                        <Button
                            type="submit"
                            variant="contained"
                            size="large" 
                            sx={{width: '90%'}}
                            onSubmit={loginSender}>
                            Zaloguj się
                        </Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
    );
}