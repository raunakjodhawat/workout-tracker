import React, { useEffect, useState } from 'react';
import SetUnitWeight from '../miniatures/SetUnitWeight';
import Multiselect from 'multiselect-react-dropdown';
import Styles from './individualExerciseSet.module.css';
export default function IndividualExerciseSet({ individualSetOfExercises, allUnits }) {
    const [sets, setSets] = useState([]);
    const [selectedIndividualSetOfExercises, setSelectedIndividualSetOfExercises] = useState([]);
    const [allSetTypes, setAllSetTypes] = useState([]);
    useEffect(() => {
        switch (selectedIndividualSetOfExercises.length) {
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
    }, [selectedIndividualSetOfExercises]);
    const onMultiSelectChange = (selectedList, _) => {
        setSelectedIndividualSetOfExercises(selectedList.map((e) => e.name));
    }
    const addSet = () => {
        setSets([...sets, sets.length]);
    }

    const removeSet = (index) => {
        setSets(sets.filter((_, i) => i !== index));
    }
    return (
        <div>
            <Multiselect
                options={individualSetOfExercises}
                displayValue="name"
                onSelect={onMultiSelectChange}
                onRemove={onMultiSelectChange}
            />
            {selectedIndividualSetOfExercises.length > 0 && (
                <>
                    {sets.map((_, i) => {
                        return (
                            <div key={i} className={Styles.inidividualExerciseSet} >
                                <SetUnitWeight id={i} allSetTypes={allSetTypes} allUnits={allUnits} selectedExercises={selectedIndividualSetOfExercises} />
                                <button type="button" className={Styles.removeButton} onClick={() => removeSet(i)}>Remove</button>
                            </div>
                        );
                    })}
                    <button type="button" onClick={addSet} className={Styles.addButton}>Add A Set</button>
                </>
            )}
        </div>
    );
}