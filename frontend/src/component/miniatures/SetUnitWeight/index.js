import React from 'react';
import styles from './setUnitWeight.module.css';
import DropSet from '../DropSet';
import SameWeightAndRepsSet from '../SameWeightAndRepsSet';
import SameWeightVariableRepsSet from '../SameWeightVariableRepsSet';

export default function SetUnitWeight({ id, allUnits, allLables, allSetTypes }) {
    const [selectedSetType, setSelectedSetType] = React.useState('SameWeightVariableRepsSet');
    const [exerciseName, setExerciseName] = React.useState('');
    const [sets, setSets] = React.useState([{ SetType: '', weight: '', unit: '', reps: '' }]);
    const [sanitizedOutput, setSanitizedOutput] = React.useState({
        exerciseName: '',
        sets: [{ SetType: '', weight: '', unit: '', reps: '' }]
    });

    const changeSetType = (e) => {
        console.log(e.target.value);
        setSelectedSetType(e.target.value);
    };

    const AddSetOptions = () => {
        switch (selectedSetType) {
            case "DropSet": {
                return <DropSet allUnits={allUnits}/>;
            }
            case "GiantSet": {
                break;
            }
            case "PyramidSet": {
                break;
            }
            case "SameWeightAndRepsSet": {
                return <SameWeightAndRepsSet allUnits={allUnits} />;
            }
            case "SameWeightVariableRepsSet": {
                return <SameWeightVariableRepsSet allUnits={allUnits} />;
            }
            case "TriSet": {
                break;
            }
            case "SuperSet": {
                break;
            }
        }
    }

    return (
        <div className={styles.SetUnitWeight}>
            <label htmlFor="setType">Type:</label>
            <select id={`${id}-setType`} className={styles.select} required onChange={changeSetType}>
                {Array.from(allSetTypes).map((v, i) => (
                    <option key={i}>{v}</option>
                ))}
            </select>
            <AddSetOptions />
        </div>
    );
}