import React, { useState } from 'react';
import SetToDropDownConvertor from '../SetToDropDownConvertor';
import SetUnitWeight from '../miniatures/SetUnitWeight';
import styles from './createSchemaPopupModule.module.css';

export default function CreateSchemaPopupModule({ allSetTypes, allExerciseNames, allUnits, setShowCreateScheduleDialog }) {
    const [exercises, setExercises] = useState([
        {
            exerciseName: '',
            sets: [{ weight: '', unit: '', reps: '' }]
        }
    ]);

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

    const addExercise = () => {
        setExercises([...exercises, { exerciseName: '', sets: [{ weight: '', unit: '', reps: '' }] }]);
    };

    const removeExercise = (exerciseIndex) => {
        setExercises(exercises.filter((_, i) => i !== exerciseIndex));
    };

    const handleSubmit = () => {
        const sanitizedExercises = exercises.map((exercise, i) => {
            return {
                date: new Date(document.getElementById('date').value).toISOString().split('T')[0],
                setType: document.getElementById('setType').value,
                exerciseName: document.getElementById(`exerciseName-${i}`).value,
                sets: exercise.sets.map((set, j) => {
                    const wt = document.getElementById(`setUnitWeight-${i}-${j}-weight`).value;
                    const reps = document.getElementById(`setUnitWeight-${i}-${j}-reps`).value;
                    return {
                        label: document.getElementById(`setUnitWeight-${i}-${j}-label`).value,
                        weight: (wt === '') ? 0: parseFloat(wt),
                        unit: document.getElementById(`setUnitWeight-${i}-${j}-unit`).value,
                        reps: (reps === '') ? 0: parseInt(reps)
                    }
                })
            }
        })
        // Form submission logic 
        console.log(sanitizedExercises);
    };

    const togglePopup = () => {
        setShowCreateScheduleDialog(false);
    };

    return (
        <div className={styles.createSchemaPopup}>
            <div className={styles.createSchemaPopupContent}>
                <span className={styles.closeButton} onClick={togglePopup}>&times;</span>
                <div className={styles.formSection}>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]}/>
                </div>
                <div className={styles.formSection}>
                    <label htmlFor="setType">Set Type:</label>
                    <SetToDropDownConvertor id="setType" options={allSetTypes} />
                </div>
                <div className={styles.formSection}>
                    <h4>Exercises</h4>
                    <button type="button" className={styles.addButton} onClick={addExercise}>
                        Add Exercise
                    </button>
                </div>
                {exercises.map((exercise, i) => (
                    <div key={i} className={styles.formSection}>
                        <SetToDropDownConvertor
                            id={`exerciseName-${i}`}
                            options={allExerciseNames}
                            selected={exercise.exerciseName}
                        />
                        <button
                            type="button"
                            className={styles.addButton}
                            onClick={() => removeExercise(i)}
                        >
                            Remove Exercise
                        </button>
                        <h5>Sets</h5>
                        {exercise.sets.map((set, j) => (
                            <SetUnitWeight id={`setUnitWeight-${i}-${j}`} key={j} allUnits={allUnits} allLables={Array.from({ length: exercise.sets.length }, (_, index) => `Set: ${index}`)} />
                        ))}
                        <button
                            type="button"
                            className={styles.addButton}
                            onClick={() => addSet(i)}
                        >
                            Add Set
                        </button>
                        <button
                            type="button"
                            className={styles.addButton}
                            onClick={() => removeSet(i, exercise.sets.length - 1)}
                        >
                            Remove Set
                        </button>
                    </div>
                ))}
                <button type="button" className={styles.submitButton} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
