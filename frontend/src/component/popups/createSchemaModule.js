import React, { useEffect, useState } from 'react';

import styles from './createSchemaPopupModule.module.css';

import Multiselect from 'multiselect-react-dropdown';
import IndividualExerciseSet from '../IndividualExerciseSet';

export default function CreateSchemaPopupModule({ allExerciseNames, setShowCreateScheduleDialog, allUnits }) {
    const [allExercisesForADay, setAllExercisesForADay] = useState([]);
    const [selectedExercisesForADay, setSelectedExercisesForADay] = useState([]);

    const [individualSetOfExercises, setIndividualSetOfExercises] = useState([]);
    const [individualExercises, setIndividualExercises] = useState([0]);

    useEffect(() => {
        setAllExercisesForADay(allExerciseNames.map((eName, i) => {
            return {
                name: eName,
                id: i
            }
        }));
        setIndividualSetOfExercises(selectedExercisesForADay.map((eName, i) => {
            return {
                name: eName,
                id: i
            }
        }));
    }, [allExerciseNames, selectedExercisesForADay]);

    const togglePopup = () => {
        setShowCreateScheduleDialog(false);
    };
    const onMultiSelectChange = (selectedList, _) => {
        setSelectedExercisesForADay(selectedList.map((e) => e.name));
    }
    const addExercise = () => {
        setIndividualExercises([...individualExercises, individualExercises.length]);
    }
    const removeExercise = (index) => {
        setIndividualExercises(individualExercises.filter((_, i) => i !== index));
    }

    return (
        <div className={styles.createSchemaPopup}>
            <div className={styles.createSchemaPopupContent}>
                <span className={styles.closeButton} onClick={togglePopup}>&times;</span>
                <div className={styles.formSection}>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <label>Please select exercises that you performed today</label>
                <Multiselect
                    options={allExercisesForADay}
                    displayValue="name"
                    onSelect={onMultiSelectChange}
                    onRemove={onMultiSelectChange}
                />
                <label> Create the exercise Schedule</label>
                {individualExercises.map((_, i) => {
                    return (
                        <div key={i} className={styles.individualExerciseSet}>
                            <IndividualExerciseSet individualSetOfExercises={individualSetOfExercises} allUnits={allUnits} />
                            <button type="button" className={styles.removeButton} onClick={() => removeExercise(i)}>Remove</button>
                        </div>
                    );
                })}
                <button type="button" className={styles.addButton} onClick={addExercise}>Add a Exercise Set</button>
            </div>
        </div>
    );
}
