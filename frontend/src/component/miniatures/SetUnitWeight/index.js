import React from 'react';
import { useState, useEffect } from 'react';
import styles from './setUnitWeight.module.css';
import DropSet from '../DropSet';
import NormalSet from '../NormalSet';
import SuperSet from '../SuperSet';

export default function SetUnitWeight({ id, allUnits, selectedExercises, allSetTypes }) {
    const [selectedSetType, setSelectedSetType] = useState('SameWeightVariableRepsSet');
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState([{ SetType: '', weight: '', unit: '', reps: '' }]);
    const [sanitizedOutput, setSanitizedOutput] = useState({
        exerciseName: '',
        sets: [{ SetType: '', weight: '', unit: '', reps: '' }]
    });

    useEffect(() => {
        if (allSetTypes.length > 0) {
            setSelectedSetType(allSetTypes[0]);
        }
    }, [allSetTypes]);
    const changeSetType = (e) => {
        setSelectedSetType(e.target.value);
    };

    const AddSetOptions = () => {
        switch (selectedSetType) {
            case "NormalSet": {
                return <NormalSet allUnits={allUnits} />;
            }
            case "DropSet": {
                return <DropSet allUnits={allUnits} />;
            }
            case "SuperSet": {
                return <SuperSet allUnits={allUnits} exerciseNames={selectedExercises} />;
            }
            default:
                break;
        }
    }

    return (
        <div className={styles.SetUnitWeight}>
            <label htmlFor="setType">Type:</label>
            <select id='setType' className={styles.select} required onChange={changeSetType}>
                {Array.from(allSetTypes).map((v, i) => (
                    <option key={i}>{v}</option>
                ))}
            </select>
            <AddSetOptions />
        </div>
    );
}