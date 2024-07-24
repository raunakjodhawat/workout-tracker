import React from 'react';
import { useState } from 'react';
import styles from './dropSet.module.css';

export default function DropSet({ allUnits }) {
    const [selectedUnit, setSelectedUnit] = useState('kg');
    const [weightAndReps, setWeightAndReps] = useState([{ weight: '', reps: '' }]);

    const addWeightAndReps = () => {
        setWeightAndReps([...weightAndReps, { weight: '', reps: '' }]);
    };
    const removeWeightAndReps = (index) => {
        setWeightAndReps(weightAndReps.filter((_, i) => i !== index));
    }

    return (
        <div>
            <label htmlFor='unit' className={styles.labels}>Unit</label>
            <select id='unit'
                required
                onChange={(e) => setSelectedUnit(e.target.value)}
                value={selectedUnit}
                className={styles.unitSelect}
            >
                {Array.from(allUnits).map((v, i) => (
                    <option key={i}>{v}</option>
                ))}
            </select>

            {weightAndReps.map((_, i) => {
                return (
                    <div key={i}>
                        <label htmlFor={`weight-${i}`} className={styles.labels}>Weight</label>
                        <input
                            type="number"
                            className={styles.input}
                            id={`weight-${i}`}
                            placeholder={`Wt(${selectedUnit})`}
                        />
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
                );
            })}
            <button
                type="button"
                onClick={addWeightAndReps}
                className={styles.addButton}
            >
                Add
            </button>

        </div>

    );
}