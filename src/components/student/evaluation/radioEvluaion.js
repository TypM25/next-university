import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import LoadingMui from '@/components/loadingMui';
import { Router } from 'next/router';

//propsเพื่อpostไปAPI
export default function RadioEvaluation({ student_id, teacher_id, term_id }) {
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])
  const router = useRouter()

  const handleAnswerChange = (questionId, score) => {
    setAnswer((prevAnswers) => {
      // ลบคำตอบเดิมของคำถามนั้นออก
      const updated = prevAnswers.filter(ans => ans.question_id !== questionId);
      // ใส่คำตอบใหม่
      return [
        ...updated,
        {
          student_id: student_id,
          teacher_id: teacher_id,
          term_id: term_id,
          question_id: questionId,
          score: parseInt(score),
        }
      ];
    });
  };

  //ส่งการประเมินอาจารย์แบบ array object
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const API_URL_CREATE = `${process.env.NEXT_PUBLIC_API_URL}/student/create/multi/evaluationDetail`;
      const response = await axios.post(API_URL_CREATE, answer)
      // console.log(response.data.message)
      // console.log(response.data.data)
      alert(response.data.message)

      router.push("/student")
    }
    catch (err) {
      alert(err.response.data.message)
    }
  }

  //fetchคำถามทั้งหมด
  async function fetchData() {
    try {
      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/student/all/question`;
      const response = await axios.get(API_URL)
      setQuestion(response.data.data)
      console.log(response.data.data)
    }
    catch (err) {
      console.log(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {question?.length > 0 ? (
        <>
          {question?.map((ques, index) => (
            <div key={index} className="flex items-center mb-3 lg:mb-5">
              {/* FORM MUI */}
              <FormControl>
                <FormLabel id={`demo-row-radio-buttons-group-label-${index}`} > คำถามที่ {index + 1}
                </FormLabel>
                <label className="flex items-center text-center">{ques.question_name}</label>
                <RadioGroup
                  row
                  aria-labelledby={`demo-row-radio-buttons-group-label-${index}`}
                  className="row-radio-buttons-group gap-4 lg:gap-20"
                  onChange={(e) => handleAnswerChange(ques.question_id, e.target.value)}
                >
                  <FormControlLabel value="5" control={<Radio />} label="5" />
                  <FormControlLabel value="4" control={<Radio />} label="4" />
                  <FormControlLabel value="3" control={<Radio />} label="3" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                </RadioGroup>
              </FormControl>
            </div>
          ))}
          <div className="w-full flex justify-center mt-10">
            <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
              Success
            </Button>
          </div>
        </>
      ) : (
        <p>ไม่มีคำถาม</p>
      )}

    </div>
  );
}