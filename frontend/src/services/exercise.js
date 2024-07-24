const getAllStoredExercises = async () => {
    const res = await fetch('http://localhost:8080/exercise/all');
    if (res.ok) {
        const jsonResponse = await res.json();
        if (jsonResponse.length > 0) {
            return jsonResponse;
        } else throw new Error("No exercises found");
    } else throw new Error("Failed to fetch exercises");
}

const deleteAExercise = async (id) => {
    const res = await fetch(`http://localhost:8080/exercise/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        return await res.json();
    } else throw new Error("Failed to delete exercise");
}

const addAExercise = async (exerciseName, muscleGroup, equipment, forceType, mechanics) => {
    const res = await fetch('http://localhost:8080/exercise/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            exerciseName: exerciseName,
            targetMuscleGroup: muscleGroup,
            equipment: equipment,
            forceType: forceType,
            mechanics: mechanics
        })
    });
    if (res.ok) {
        return await res.json();
    } else throw new Error("Failed to add exercise");

}
const updateAExercise = async (id, updatedExerciseName, updatedMuscleGroup, updatedEquipment, updatedForceType, updatedMechanics) => {
    const res = await fetch(`http://localhost:8080/exercise/edit/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            exerciseName: updatedExerciseName,
            targetMuscleGroup: updatedMuscleGroup,
            equipment: updatedEquipment,
            forceType: updatedForceType,
            mechanics: updatedMechanics
        })
    });
    if (res.ok) {
        return await res.json();
    } else throw new Error("Failed to update exercise");
}

const getExerciseConstants = async () => {
    const res = await fetch('http://localhost:8080/exercise/defaults');
    return res.json();
}

const getAllExerciseNames = async () => {
    const res = await fetch('http://localhost:8080/exercise/defaults/name');
    return res.json();
}

export {
    getExerciseConstants,
    getAllStoredExercises,
    deleteAExercise,
    updateAExercise,
    addAExercise,
    getAllExerciseNames
}