"use client"
import styles from './exercise.module.css';

import SetToDropDownConvertor from '../../component/SetToDropDownConvertor.js';
import { getExerciseConstants } from '../../services/exercise.js';
import { useEffect, useState } from "react";

export default function Exercise() {
  const [muscleGroups, setMuscleGroup] = useState(new Set(['']));
  const [equipment, setEquipment] = useState(new Set(['']));
  const [forceType, setForceType] = useState(new Set(['']));
  const [mechanics, setMechanics] = useState(new Set(['']));

  useEffect(() => {
    getExerciseConstants().then((data) => {
      setMuscleGroup(data['MuscleGroup']);
      setEquipment(data['Equipment']);
      setForceType(data['ForceType']);
      setMechanics(data['Mechanics']);
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, []);
  
  return (
    <main>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Exercise Name</th>
          <th>Muscle Group</th>
          <th>Equipment</th>
          <th>Type</th>
          <th>Mechanics</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input className={styles.input} type="text" placeholder="Exercise name" /></td>
          <td><SetToDropDownConvertor className={styles.select} options={muscleGroups} label = "Muscle Group" /></td>
          <td><SetToDropDownConvertor className={styles.select} options={equipment} label = "Equipment" /></td>
          <td><SetToDropDownConvertor className={styles.select} options={forceType} label = "Type" /></td>
          <td><SetToDropDownConvertor className={styles.select} options={mechanics} label = "Mechanics" /></td>
          <td>
          <input className={styles.submit} type="submit" value="Save" />
          <input className={styles.submit} type="submit" value="Delete" />
          </td>
        </tr>
      </tbody>
    </table>
    </main>
  );
}
