"use client"
import EvaluationComponent from "@/components/student/evaluation/evaluationComponent";
import { Suspense } from "react";
import LoadingMui from "@/components/loadingMui";

export default function Evaluation() {

    //ถ้ามีค่าเเล้ว
    return (
        <div>
            <Suspense fallback={<div><LoadingMui/></div>}>
                <EvaluationComponent />
            </Suspense>
        </div>
    );
}
