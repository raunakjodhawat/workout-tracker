"use client";

import { getAllExerciseNames } from '../../services/exercise.js';
import { getAllSetTypes, addASchedule } from '../../services/schedule.js';
import { useEffect, useState } from "react";
import SetToDropDownConvertor from '../../component/SetToDropDownConvertor.js';
import styles from './schedule.module.css';

export default function Schedule() {
    const [allExerciseNames, setAllExerciseNames] = useState([]);
    const [allSetTypes, setAllSetTypes] = useState([]);
    const [allUnits, setAllUnits] = useState([]);
    const [date, setDate] = useState('');
    const [setType, setSetType] = useState('');
    const [exercises, setExercises] = useState([
        {
            exerciseName: '',
            sets: [{ weight: '', unit: '', reps: '' }]
        }
    ]);

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = exercises.map((exercise, i) =>
            i === index ? { ...exercise, [field]: value } : exercise
        );
        setExercises(updatedExercises);
    };

    const handleSetChange = (exerciseIndex, setIndex, field, value) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const updatedSets = exercise.sets.map((set, j) =>
                    j === setIndex ? { ...set, [field]: value } : set
                );
                return { ...exercise, sets: updatedSets };
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const addExercise = () => {
        setExercises([...exercises, { exerciseName: '', sets: [{ weight: '', unit: '', reps: '' }] }]);
    };

    const removeExercise = (exerciseIndex) => {
        setExercises(exercises.filter((_, i) => i !== exerciseIndex));
    };

    const addSet = (exerciseIndex) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                return { ...exercise, sets: [...exercise.sets, { weight: '', unit: '', reps: '' }] };
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const removeSet = (exerciseIndex, setIndex) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const updatedSets = exercise.sets.filter((_, j) => j !== setIndex);
                return { ...exercise, sets: updatedSets };
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const workoutData = {
            date: new Date(date),
            setType: document.getElementById('setType').value,
            exercisesPerformed: exercises.map((exercise, exerciseIndex) => {
                return {
                    exerciseName: exercise.exerciseName,
                    sets: exercise.sets.map((set, setIndex) => {
                        return {
                            weight: set.weight,
                            unit: document.getElementById(`unit-${exerciseIndex}-${setIndex}`).value,
                            reps: set.reps
                        };
                    })
                }
            })
        };
        addASchedule(workoutData);
        console.log(workoutData);
    };

    useEffect(() => {
        getAllSetTypes().then((data) => {
            setAllSetTypes(data['setType']);
            setAllUnits(data['weightUnit']);
        }).catch((error) => {
            console.error('Error:', error);
        });

        getAllExerciseNames().then((data) => {
            setAllExerciseNames(data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
                <label>Set Type:</label>
                <SetToDropDownConvertor id="setType" className={styles.select} options={allSetTypes} onChange={(value) => setSetType(value)} />
            </div>
            {exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className={styles.exerciseGroup}>
                    <div className={styles.formGroup}>
                        <label>Exercise Name:</label>
                        <SetToDropDownConvertor id={`exerciseName-${exerciseIndex}`} className={styles.select} options={allExerciseNames} onChange={(value) => handleExerciseChange(exerciseIndex, 'exerciseName', value)} />
                    </div>
                    {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex} className={styles.setGroup}>
                            <div className={styles.formGroup}>
                                <label>Weight:</label>
                                <input
                                    type="number"
                                    value={set.weight}
                                    onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Unit:</label>
                                <SetToDropDownConvertor id={`unit-${exerciseIndex}-${setIndex}`} className={styles.select} options={allUnits} onChange={(value) => handleSetChange(exerciseIndex, setIndex, 'unit', value)} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Reps:</label>
                                <input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                                />
                            </div>
                            <button type="button" onClick={() => removeSet(exerciseIndex, setIndex)} className={styles.removeButton}>Remove Set</button>
                        </div>
                    ))}
                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={() => addSet(exerciseIndex)} className={styles.addButton}>Add Set</button>
                        <button type="button" onClick={() => removeExercise(exerciseIndex)} className={styles.removeButton}>Remove Exercise</button>
                    </div>
                </div>
            ))}
            <button type="button" onClick={addExercise} className={styles.addButton}>Add Exercise</button>
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
}
