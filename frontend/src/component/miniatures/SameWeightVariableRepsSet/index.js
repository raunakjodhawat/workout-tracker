import React from 'react';
import { useState } from 'react';
import styles from './sameWeightVariableRepsSet.module.css';

export default function SameWeightVariableRepsSet({ allUnits }) {
    const [selectedUnit, setSelectedUnit] = useState('kg');
    const [reps, setReps] = useState([{ reps: '' }]);

    const addReps = () => {
        setReps([...reps, { reps: '' }]);
    };
    const removeReps = (index) => {
        setReps(reps.filter((_, i) => i !== index));
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
            {reps.map((_, i) => {
                return (
                    <div key={i}>
                        <label htmlFor='repCount' className={styles.labels}>Reps</label>
                        <input
                            type="number"
                            className={styles.input}
                            id='repCount'
                            placeholder='0'
                        />
                        <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => removeReps(i)}
                        >
                            remove
                        </button>
                    </div>
                );
            })}
            <button
                type="button"
                onClick={addReps}
                className={styles.addButton}
            >
                Add
            </button>

        </div>

    );
}