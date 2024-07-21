"use client"
import { getAllExerciseNames } from '../../services/exercise.js';
import { useEffect, useState } from "react";

export default function Schedule() {
    const [allexerciseNames, setAllExerciseNames] = useState([]);

    useEffect(() => {
        getAllExerciseNames().then((data) => {
            console.log(data);
            setAllExerciseNames(data);
        }).catch((error) => {
            console.error('Error:', error);
        })
    }, []);
    return (
        <main>
            Track your exercise
        </main>
    );
}
