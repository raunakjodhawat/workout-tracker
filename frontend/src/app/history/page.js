"use client";
// pages/history.js
import { useEffect, useState } from "react";
import { getHistoricalData, updateExistingSchedule } from "../../services/history.js";
import styles from './history.module.css';


export default function History() {
    const [selectionDate, setSelectionDate] = useState('2024-07-20');
    const [history, setHistory] = useState([{
        exercisesPerformed: [],
        id: 0,
        setType: ''
    }]);

    useEffect(() => {
        getHistoricalData("2024-07-20").then(data => {
            const sanitizedData = data.map(d => {
                return {
                    date: d.date,
                    exercisesPerformed: JSON.parse(d.exercisesPerformed),
                    id: d.id,
                    setType: JSON.parse(d.setType)
                }
            });
            setHistory(sanitizedData);
        });
    }, []);

    const handleEdit = (id) => {
        // Implement edit functionality here
        console.log(`Edit exercise with id: ${id}`);
    };

    const handleDelete = (id) => {
        setHistory(history.filter(record => record.id !== id));
    };

    return (
        <div className={styles.container}>
            <h1>Exercise History</h1>
            <date>{selectionDate}</date>
            <table>
                <thead>
                    <tr>
                        <td>Set Type</td>
                        <td>Exercise</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {history.map(record => (
                        <tr>
                            <td>{record.setType}</td>
                            <td>{record.exercisesPerformed.map((exercise, index) => (
                                <div key={index} className={styles.exercise}>
                                    Name: {exercise.exerciseName}
                                    <td>{exercise.sets.map((set, idx) => (
                                        <tr key={idx}> {set.weight} {set.unit}, Reps: {set.reps}
                                            <button onClick={() => handleEdit(record.id)} className={styles.editButton}>Edit</button>
                                            <button onClick={() => handleDelete(record.id)} className={styles.deleteButton}>Delete</button>
                                        </tr>
                                    ))}</td>
                                </div>
                            ))}</td>
                            <td>
                                <button onClick={() => handleEdit(record.id)} className={styles.editButton}>Edit</button>
                                <button onClick={() => handleDelete(record.id)} className={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}