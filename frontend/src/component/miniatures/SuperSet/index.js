import React from 'react';
import { useState } from 'react';
import styles from './superSet.module.css';

export default function SuperSet({ exerciseNames, allUnits }) {
    const [weightAndReps, setWeightAndReps] = useState([{ weight: '', reps: '' }]);

    const addWeightAndReps = () => {
        setWeightAndReps([...weightAndReps, { weight: '', reps: '' }]);
    };
    const removeWeightAndReps = (index) => {
        setWeightAndReps(weightAndReps.filter((_, i) => i !== index));
    }

    return (
        <div>
            {weightAndReps.map((_, i) => {
                return (
                    <div key={i}>
                        <div className={styles.exericiseNameSelector}>
                            <label htmlFor={`exerciseName-${i}`} className={styles.labels}>Exercise Name</label>
                            <select id={`exerciseName-${i}`}
                                required
                                className={styles.exerciseNameSelect}
                            >
                                {Array.from(exerciseNames).map((v, i) => (
                                    <option key={i}>{v}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor={`weight-${i}`} className={styles.labels}>Weight</label>
                            <input
                                type="number"
                                className={styles.input}
                                id={`weight-${i}`}
                                placeholder="0"
                            />
                            <label htmlFor={`unit-${i}`} className={styles.labels}>in</label>
                            <select id={`unit-${i}`}
                                required
                                className={styles.unitSelect}
                            >
                                {Array.from(allUnits).map((v, i) => (
                                    <option key={i}>{v}</option>
                                ))}
                            </select>

                            <label htmlFor={`reps-${i}`} className={styles.labels}>Reps</label>
                            <input
                                type="number"
                                className={styles.input}
                                id={`reps-${i}`}
                                placeholder="0"
                            />
                            <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => removeWeightAndReps(i)}
                            >
                                remove
                            </button>
                        </div>
                    </div>
                );
            })}
            <button
                type="button"
                onClick={addWeightAndReps}
                className={styles.addButton}
            >
                Add Rep
            </button>

        </div>

    );
}