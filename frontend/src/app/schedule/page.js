"use client";

import { getAllExerciseNames } from '../../services/exercise.js';
import { getAllSetTypes, addASchedule } from '../../services/schedule.js';
import { getHistoricalData, updateExistingSchedule } from "../../services/history.js";

import { useEffect, useState } from "react";
import SetToDropDownConvertor from '../../component/SetToDropDownConvertor.js';
import styles from './schedule.module.css';

export default function Schedule() {
    const [allExerciseNames, setAllExerciseNames] = useState([]);
    const [allSetTypes, setAllSetTypes] = useState([]);
    const [allUnits, setAllUnits] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [setType, setSetType] = useState('');
    const [exercises, setExercises] = useState([
        {
            exerciseName: '',
            sets: [{ weight: '', unit: '', reps: '' }]
        }
    ]);
    const [history, setHistory] = useState([]);

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
                    exerciseName: document.getElementById(`exerciseName-${exerciseIndex}`).value,
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
    };

    useEffect(() => {
        getHistoricalData(date).then(data => {
            const sanitizedData = data.map(d => {
                return {
                    exercisesPerformed: JSON.parse(d.exercisesPerformed),
                    id: d.id,
                    setType: JSON.parse(d.setType)
                }
            });
            setHistory(sanitizedData);
        });
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
    }, [date]);

    const handleDelete = (id) => {
        setHistory(history.filter((record) => record.id !== id));
        // Add logic to delete the record from the server if needed.
    };

    return (
        <main>
            <input type="date" className={styles.date} value={date} onChange={(e) => setDate(e.target.value)} />
            <table className={styles.scheduleTable}>
                <thead>
                    <tr>
                        <th>Set Type</th>
                        <th>Exercise</th>
                        <th>Delete Exercise</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record, recordIndex) => (
                        <tr key={recordIndex}>
                            <td>
                                <SetToDropDownConvertor
                                    id={`setType-${recordIndex}`}
                                    className={styles.select}
                                    options={allSetTypes}
                                    onChange={(value) => {
                                        const updatedHistory = [...history];
                                        updatedHistory[recordIndex].setType = value;
                                        setHistory(updatedHistory);
                                    }}
                                    selected={record.setType}
                                />
                            </td>
                            <td>
                                {record.exercisesPerformed.map((exercise, exerciseIndex) => (
                                    <div key={exerciseIndex}>
                                        <SetToDropDownConvertor
                                            id={`exerciseName-${recordIndex}-${exerciseIndex}`}
                                            className={styles.select}
                                            options={allExerciseNames}
                                            onChange={(value) => {
                                                const updatedHistory = [...history];
                                                updatedHistory[recordIndex].exercisesPerformed[exerciseIndex].exerciseName = value;
                                                setHistory(updatedHistory);
                                            }}
                                            selected={exercise.exerciseName}
                                        />
                                        <table className={styles.exerciseTable}>
                                            <thead>
                                                <tr>
                                                    <th>Weight</th>
                                                    <th>Unit</th>
                                                    <th>Reps</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {exercise.sets.map((set, setIndex) => (
                                                    <tr key={setIndex}>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                value={set.weight}
                                                                onChange={(e) => {
                                                                    const updatedHistory = [...history];
                                                                    updatedHistory[recordIndex].exercisesPerformed[exerciseIndex].sets[setIndex].weight = e.target.value;
                                                                    setHistory(updatedHistory);
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <SetToDropDownConvertor
                                                                id={`unit-${recordIndex}-${exerciseIndex}-${setIndex}`}
                                                                className={styles.select}
                                                                options={allUnits}
                                                                onChange={(value) => {
                                                                    const updatedHistory = [...history];
                                                                    updatedHistory[recordIndex].exercisesPerformed[exerciseIndex].sets[setIndex].unit = value;
                                                                    setHistory(updatedHistory);
                                                                }}
                                                                selected={set.unit}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                value={set.reps}
                                                                onChange={(e) => {
                                                                    const updatedHistory = [...history];
                                                                    updatedHistory[recordIndex].exercisesPerformed[exerciseIndex].sets[setIndex].reps = e.target.value;
                                                                    setHistory(updatedHistory);
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedHistory = [...history];
                                                                    updatedHistory[recordIndex].exercisesPerformed[exerciseIndex].sets = updatedHistory[recordIndex].exercisesPerformed[exerciseIndex].sets.filter((_, j) => j !== setIndex);
                                                                    setHistory(updatedHistory);
                                                                }}
                                                                className={styles.removeButton}
                                                            >
                                                                Remove Set
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className={styles.addSetButton}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedHistory = [...history];
                                                    updatedHistory[recordIndex].exercisesPerformed[exerciseIndex].sets.push({ weight: '', unit: '', reps: '' });
                                                    setHistory(updatedHistory);
                                                }}
                                                className={styles.addButton}
                                            >
                                                Add Set
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(record.id)}
                                    className={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <table className={styles.scheduleTable}>
                <thead>
                    <tr>
                        <th>Set Type</th>
                        <th>Exercise</th>
                        <th>Delete Exercise</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <SetToDropDownConvertor
                                id="setType"
                                className={styles.select}
                                options={allSetTypes}
                                onChange={(value) => setSetType(value)}
                            />
                        </td>
                        <td>
                            {exercises.map((exercise, exerciseIndex) => (
                                <div key={exerciseIndex}>
                                    <SetToDropDownConvertor
                                        id={`exerciseName-${exerciseIndex}`}
                                        className={styles.select}
                                        options={allExerciseNames}
                                        onChange={(value) => handleExerciseChange(exerciseIndex, 'exerciseName', value)}
                                    />
                                    <table className={styles.exerciseTable}>
                                        <thead>
                                            <tr>
                                                <th>Weight</th>
                                                <th>Unit</th>
                                                <th>Reps</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exercise.sets.map((set, setIndex) => (
                                                <tr key={setIndex}>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={set.weight}
                                                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <SetToDropDownConvertor
                                                            id={`unit-${exerciseIndex}-${setIndex}`}
                                                            className={styles.select}
                                                            options={allUnits}
                                                            onChange={(value) => handleSetChange(exerciseIndex, setIndex, 'unit', value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={set.reps}
                                                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSet(exerciseIndex, setIndex)}
                                                            className={styles.removeButton}
                                                        >
                                                            Remove Set
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className={styles.addSetButton}>
                                        <button
                                            type="button"
                                            onClick={() => addSet(exerciseIndex)}
                                            className={styles.addButton}
                                        >
                                            Add Set
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </td>
                        <td>
                            <button
                                type="button"
                                onClick={() => removeExercise(0)}
                                className={styles.removeButton}
                            >
                                Remove Exercise
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" onClick={addExercise} className={styles.addButton}>Add Exercise</button>
            <br />
            <br />
            <button type="button" onClick={handleSubmit} className={styles.submitButton}>Submit</button>
        </main>
    );
}
