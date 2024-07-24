import React from 'react';
import { useState } from 'react';
import styles from './sameWeightAndRepsSet.module.css';

export default function SameWeightAndRepsSet({ allUnits }) {
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
            <label htmlFor='weight' className={styles.labels}>Weight</label>
            <input
                type="number"
                className={styles.input}
                id='weight'
                placeholder={`Wt(${selectedUnit})`}
            />
            <label htmlFor='reps' className={styles.labels}>Reps</label>
            <input
                type="number"
                className={styles.input}
                id='reps'
                placeholder="0"
            />

            <label htmlFor='setCount' className={styles.labels}>Sets</label>
            <input
                type="number"
                className={styles.input}
                id='setCount'
                placeholder='0'
            />

        </div>

    );
}