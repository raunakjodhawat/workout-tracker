import React, { useEffect, useState } from 'react';
import SetUnitWeight from '../miniatures/SetUnitWeight';
import styles from './createSchemaPopupModule.module.css';

import Multiselect from 'multiselect-react-dropdown';

export default function CreateSchemaPopupModule({ allExerciseNames, allUnits, setShowCreateScheduleDialog }) {
    const [allSetTypes, setAllSetTypes] = useState([]);
    const [exerciseType, setExerciseType] = useState();
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [sets, setSets] = useState([0]);
    useEffect(() => {
        setExerciseType(allExerciseNames.map((eName, i) => {
            return {
                name: eName,
                id: i
            }
        }));
        switch (selectedExercises.length) {
            case 0: {
                setAllSetTypes(['Please select a exercise']);
                break;
            }
            case 1: {
                setAllSetTypes(['NormalSet', 'DropSet']);
                break;
            }
            case 2: {
                setAllSetTypes(['SuperSet']);
                break;
            }
            case 3: {
                setAllSetTypes(['TriSet']);
                break;
            }
            default: {
                setAllSetTypes(['GiantSet']);
                break;
            }
        }
    }, [allExerciseNames, selectedExercises]);
    const [exercises, setExercises] = useState([
        {
            exerciseName: '',
            sets: [{ weight: '', unit: '', reps: '' }]
        }
    ]);


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
                        weight: (wt === '') ? 0 : parseFloat(wt),
                        unit: document.getElementById(`setUnitWeight-${i}-${j}-unit`).value,
                        reps: (reps === '') ? 0 : parseInt(reps)
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
    const onMultiSelectChange = (selectedList, _) => {
        setSelectedExercises(selectedList.map((e) => e.name));
    }
    const addSet = () => {
        setSets([...sets, sets.length]);
    }

    const removeSet = (index) => {
        setSets(sets.filter((_, i) => i !== index));
    }

    return (
        <div className={styles.createSchemaPopup}>
            <div className={styles.createSchemaPopupContent}>
                <span className={styles.closeButton} onClick={togglePopup}>&times;</span>
                <div className={styles.formSection}>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <Multiselect
                    options={exerciseType}
                    displayValue="name"
                    onSelect={onMultiSelectChange}
                    onRemove={onMultiSelectChange}
                />
                {selectedExercises.length > 0 && (
                    <>
                        {sets.map((_, i) => {
                            return (
                                <div key={i} className={styles.setTypeRemove}>
                                    <SetUnitWeight id={i} allSetTypes={allSetTypes} allUnits={allUnits} selectedExercises={selectedExercises} />
                                    <button type="button" className={styles.setTypeRemoveButton} onClick={() => removeSet(i)}>Remove</button>
                                </div>
                            );
                        })}
                        <button type="button" className={styles.addButton} onClick={addSet}>Add A Set</button>
                        <button type="button" className={styles.submitButton} onClick={handleSubmit}>
                            Submit
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}
