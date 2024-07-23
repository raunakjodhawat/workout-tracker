import SetToDropDownConvertor from '../../SetToDropDownConvertor.js';
import React from 'react';
import styles from './setUnitWeight.module.css';

export default function SetUnitWeight({ id, allUnits }) {
    return (
        <div className={styles.SetUnitWeight}>
            Weight: <input
                type="number"
                id={`${id}-weight`}
                className={styles.SetUnitWeighInput}
            />
            <SetToDropDownConvertor
                options={allUnits}
                id={`${id}-unit`}
                className={styles.SetUnitWeightDropDown}
            />
            Reps: <input
                type="number"
                id={`${id}-reps`}
                className={styles.SetUnitWeighInput} />
        </div>
    );
}