import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, Typography, List, ListItem } from '@mui/material';
import React from 'react';
import { BASE_URL } from '../../../api';
import { red, green,grey } from '@mui/material/colors';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

export default function Answer({questionAnswers}) {
    const[expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const markCorrectOrNot = (qna, id) => {
        if ([qna.selected, qna.correctAnswer].includes(id)) {
            return { sx: { color: qna.correctAnswer == id ? green[500] : red[500] } }
        }
    } 

    return (
        <Box sx={{mt: 5, width: '100%', maxWidth: 640, mx: 'auto'}}>
            {
                questionAnswers.map((item, j) => (
                <Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChange(j)}>
                    <AccordionSummary expandIcon={<ExpandCircleDownIcon
                            sx={{
                                color: item.correctAnswer == item.selected ? green[500] : red[500]
                            }}
                        />}>
                        <Typography
                            sx={{ width: '90%', flexShrink: 0 }}>
                            {item.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.imageName 
                            ? <CardMedia component="img" image={BASE_URL + 'images/'   + item.imageName} sx={{m: '10px auto', width: 'auto'}}
                                />
                            : null
                        }
                        <List>
                            {item.options.map((x, id) => 
                                <ListItem key={id}>
                                    <Typography {...markCorrectOrNot(item, id)}>
                                        <b>
                                            {String.fromCharCode(65 + id) + ". "}
                                        </b>{x}
                                    </Typography>
                                </ListItem>
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>
                ))
            }
        </Box>
    )
}