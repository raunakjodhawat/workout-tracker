"use client"
import styles from './exercise.module.css';

import SetToDropDownConvertor from '../../component/SetToDropDownConvertor.js';
import { getExerciseConstants, getAllStoredExercises, updateAExercise, deleteAExercise, addAExercise } from '../../services/exercise.js';
import { useEffect, useState } from "react";

export default function Exercise() {
  const [storedExercises, setStoredExercises] = useState([]);
  const [muscleGroups, setMuscleGroup] = useState(new Set(['']));
  const [equipment, setEquipment] = useState(new Set(['']));
  const [forceType, setForceType] = useState(new Set(['']));
  const [mechanics, setMechanics] = useState(new Set(['']));

  const updateStoredExercise = () => {
    getAllStoredExercises().then((data) => {
      setStoredExercises(data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
  const saveExercise = (id) => {
    // Fetch updated values directly from the DOM elements
    const updatedExerciseName = document.getElementById(`name-${id}`).value;
    const updatedMuscleGroup = document.getElementById(`muscleGroup-${id}`).value;
    const updatedEquipment = document.getElementById(`equipment-${id}`).value;
    const updatedForceType = document.getElementById(`forceType-${id}`).value;
    const updatedMechanics = document.getElementById(`mechanics-${id}`).value;

    updateAExercise(id, updatedExerciseName, updatedMuscleGroup, updatedEquipment, updatedForceType, updatedMechanics).then((_) => {
      updateStoredExercise();
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
  const deleteExercise = (id) => {
    deleteAExercise(id).then((_) => {
      updateStoredExercise();
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  const addExercise = () => {
    const newExerciseName = document.getElementById(`name-new`).value;
    const newMuscleGroup = document.getElementById(`muscleGroup-new`).value;
    const newEquipment = document.getElementById(`equipment-new`).value;
    const newForceType = document.getElementById(`forceType-new`).value;
    const newMechanics = document.getElementById(`mechanics-new`).value;
    addAExercise(newExerciseName, newMuscleGroup, newEquipment, newForceType, newMechanics)
      .then((_) => {
        updateStoredExercise();
      }).catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    updateStoredExercise();
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
          {storedExercises.map((exercise) => {
            return (
              <tr key={exercise.id}>
                <td><input id={`name-${exercise.id}`} className={styles.input} type="text" placeholder="Exercise name" defaultValue={exercise.exerciseName} /></td>
                <td><SetToDropDownConvertor id={`muscleGroup-${exercise.id}`} className={styles.select} options={muscleGroups} selected={exercise.targetMuscleGroup} /></td>
                <td><SetToDropDownConvertor id={`equipment-${exercise.id}`} className={styles.select} options={equipment} selected={exercise.equipment} /></td>
                <td><SetToDropDownConvertor id={`forceType-${exercise.id}`} className={styles.select} options={forceType} selected={exercise.forceType} /></td>
                <td><SetToDropDownConvertor id={`mechanics-${exercise.id}`} className={styles.select} options={mechanics} selected={exercise.mechanics} /></td>
                <td>
                  <input className={styles.submit} type="submit" value="Save" onClick={() => saveExercise(exercise.id)} />
                  <input className={styles.submit} type="submit" value="Delete" onClick={() => deleteExercise(exercise.id)} />
                </td>
              </tr>
            )
          })}
          <tr>
            <td><input id={`name-new`} className={styles.input} type="text" placeholder="Exercise name" /></td>
            <td><SetToDropDownConvertor id={`muscleGroup-new`} className={styles.select} options={muscleGroups} /></td>
            <td><SetToDropDownConvertor id={`equipment-new`} className={styles.select} options={equipment} /></td>
            <td><SetToDropDownConvertor id={`forceType-new`} className={styles.select} options={forceType} /></td>
            <td><SetToDropDownConvertor id={`mechanics-new`} className={styles.select} options={mechanics} /></td>
            <td>
              <input className={styles.submit} type="submit" value="Create" onClick={() => addExercise()} />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
