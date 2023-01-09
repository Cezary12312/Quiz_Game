import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../../api';
import useStateContext from '../../../Hooks/useStateContext'
import { Card, Box, CardContent, CardMedia, Typography, Button, Alert} from '@mui/material'
import { getFormatedTime } from '../../../Helper'
import { useNavigate } from 'react-router-dom';
import Answer from '../Answer/Answer';

export default function Result() {
    const {context, setContext} = useStateContext();
    const [score, setScore] = useState(0)
    const [questionAnswers, setQuestionAnswers] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const ids = context.selectedOptions.map(x => x.Id)
        createAPIEndpoint(ENDPOINTS.getAnswers)
        .post(ids)
        .then(res => {
            const questionAnswer = context.selectedOptions.map(x => ({
                ...x,
                ...(res.data.find(y => y.id == x.Id))
            }))
            setQuestionAnswers(questionAnswer)
            calculateScore(questionAnswer)
        })
        .catch(err => console.log(err))
    }, [])

    const calculateScore = questionAnswer => {
        let tempScore = questionAnswer.reduce((score, current) => {
            return current.correctAnswer == current.selected ? score + 1 : score;
        }, 0)
        setScore(tempScore)
    }

    const restart = () => {
        setContext({
            timer: 0,
            selectedOptions: []
        })
        navigate("/question")
    }

    const submitScore = () => {
        createAPIEndpoint(ENDPOINTS.participant)
        .put(context.participantId, {
            participantId: context.participantId,
            score: score,
            timeTaken: context.timeTaken
        })
        .then(res => {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 4000);
        })
        .catch(err => console.log(err))
        navigate("/")
    }

    return (
        <>
            <Card sx={{mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                    <CardContent sx={{flex: '1 0 auto', textAlign: 'center'}}>
                        <Typography variant="h4">
                            Gratulacje!
                        </Typography>
                        <Typography variant="h6">
                            Twój wynik
                        </Typography>
                        <Typography variant="h5" sx={{fontWeight: 600}}>
                            <Typography variant="span">
                                {score}
                            </Typography>
                            /5
                        </Typography>
                        <Typography variant="h6">
                            {"Czas: " + getFormatedTime(context.timeTaken)}
                        </Typography>
                        <Button variant="contained" sx={{maxHeight: 1}} size="small" onClick={submitScore}>
                            Akceptuj
                        </Button>
                        <Button variant="contained" sx={{mx: 1}} size="small" onClick={restart}>
                            Spróbuj ponownie
                        </Button>
                        <Alert severity="success" variant="string" sx={{width: '60%', m: 'auto', visibility: showAlert ? 'visible' : 'hidden'}}>
                            Zaktualizowano punktacje
                        </Alert>
                    </CardContent>
                </Box>
                <CardMedia component="img" sx={{width: 220}} image="./result.jpg" />
            </Card>
            <Answer questionAnswers={questionAnswers} />
        </>
    )
}