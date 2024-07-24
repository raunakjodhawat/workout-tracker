import React from 'react';
import { useState } from 'react';
import styles from './normalSet.module.css';

export default function NormalSet({ allUnits }) {
    const [selectedUnit, setSelectedUnit] = useState('kg');

    return (
        <div className={styles.weightAndReps}>
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
            <label htmlFor={`weight`} className={styles.labels}>Weight</label>
            <input
                type="number"
                className={styles.input}
                id={`weight`}
                placeholder={`Wt(${selectedUnit})`}
            />
            <label htmlFor={`reps`} className={styles.labels}>Reps</label>
            <input
                type="number"
                className={styles.input}
                id={`reps`}
                placeholder="0"
            />
        </div>
    );
}