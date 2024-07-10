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
    <main className={styles.main}>
    <form className={styles.form} type="submit">
      <input className={styles.input} type="text" placeholder="Exercise name" />
      <SetToDropDownConvertor className={styles.select} options={muscleGroups} label = "Muscle Group" />
      <SetToDropDownConvertor className={styles.select} options={equipment} label = "Equipment" />
      <SetToDropDownConvertor className={styles.select} options={forceType} label = "Type" />
      <SetToDropDownConvertor className={styles.select} options={mechanics} label = "Mechanics" />
      <input className={styles.submit} type="submit" value="Submit" />
    </form>
    </main>
  );
}
