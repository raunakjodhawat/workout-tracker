"use client"
import styles from "./page.module.css";
import SetToDropDownConvertor from '../component/SetToDropDownConvertor.js';
import { getExerciseConstants } from '../services/exercise';
import { useEffect, useState } from "react";

export default function Home() {
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
    <form type="submit">
      <input type="text" placeholder="Exercise name" />
      <SetToDropDownConvertor options={muscleGroups} label = "Muscle Group" />
      <SetToDropDownConvertor options={equipment} label = "Equipment" />
      <SetToDropDownConvertor options={forceType} label = "Type" />
      <SetToDropDownConvertor options={mechanics} label = "Mechanics" />
      <input type="submit" value="Submit" />
    </form>
    </main>
  );
}
