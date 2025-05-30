"use client"
import { useSearchParams } from 'next/navigation';
import LoadingMui from '@/components/loadingMui';
import RadioEvaluation from './radioEvluaion';

export default function EvaluationComponent() {
  const searchParams = useSearchParams();
  const student_id = searchParams.get('student_id');
  const teacher_id = searchParams.get('teacher_id');
  const term_id = searchParams.get('term_id');

  // ถ้าparamsยังไม่มา
  if (!student_id || !teacher_id || !term_id) {
    return <div>
      <LoadingMui />
    </div>
  }

  //ถ้า paramsมาเเล้ว
  return (
    <div className="mt-10">
      <RadioEvaluation
        student_id={student_id}
        teacher_id={teacher_id}
        term_id={term_id}
      />
    </div>
  );
}
